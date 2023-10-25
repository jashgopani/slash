const { useState, useReducer, useRef } = React;
const SERVER_URL = window.origin;
console.log({ SERVER_URL });

const reducer = (state, { type, data }) => {
	switch (type) {
		case 'UPDATE_PRODUCTS':
			return { ...state, searchResults: data, filteredSearchResults: data };
		case 'UPDATE_SEARCH_STATUS':
			return { ...state, searchStatus: data.status, searchResCode: data.resCode };
		case 'ADD_FILTER':
			const existingFilters = state.filters;
			return {
				...state,
				filteredSearchResults: filterSearchResults(
					{ ...existingFilters, ...data },
					state.searchResults
				),
			};
		default:
			return state;
	}
};

function App({}) {
	const appState = {
		searchResults: [],
		searchStatus: 0, //0-no search in progress;1-fetching data;2-fetched
		searchResCode: -1, //this would be the httpStatusCode of the previous response
		filters: {}, //key->filter function
		filteredSearchResults: [],
	};
	const [state, dispatch] = useReducer(reducer, appState);

	return (
		<>
			<div class='d-flex flex-column gap-2'>
				<Navbar searchStatus={state.searchStatus} dispatch={dispatch} />
				<ProductResults
					searchResults={state.filteredSearchResults}
					searchResCode={state.searchResCode}
					dispatch={dispatch}
				/>
			</div>
		</>
	);
}

function Spinner({ sm }) {
	return (
		<div class={`spinner-border ${sm ? 'spinner-border-sm' : ''}`} role='status'>
			<span class='visually-hidden'>Loading...</span>
		</div>
	);
}

function Icon({ name, classes }) {
	return <ion-icon name={name} class={classes ? classes : ''}></ion-icon>;
}

function Navbar({ searchStatus, dispatch }) {
	const queryRef = useRef('');
	const [isLoading, setIsLoading] = useState(false);
	return (
		<nav class='navbar bg-body-tertiary d-flex p-2 flex-nowrap px-4'>
			<a class='navbar-brand flex-grow-0 ' href='#'>
				<img src='../assets/slash.png' alt='Slash-logo' width='auto' height='32' />
			</a>
			<form
				class='d-flex flex-grow-1'
				role='search'
				onSubmit={async e => {
					e.preventDefault();
					if (
						(searchStatus == 0 || searchStatus == 2) &&
						queryRef.current &&
						queryRef.current.trim().length > 0
					) {
						dispatch({ type: 'UPDATE_SEARCH_STATUS', data: '1' });
						setIsLoading(true);
						try {
							const data = await fetchProducts(queryRef.current);
							dispatch({ type: 'UPDATE_PRODUCTS', data });
							dispatch({
								type: 'UPDATE_SEARCH_STATUS',
								data: { status: '2', resCode: 200 },
							});
						} catch (error) {
							dispatch({ type: 'UPDATE_PRODUCTS', data: [] });
							dispatch({
								type: 'UPDATE_SEARCH_STATUS',
								data: { status: '2', resCode: 500 },
							});
						} finally {
							setIsLoading(false);
						}
					}
				}}>
				<input
					class='form-control me-2 rounded-pill'
					type='search'
					placeholder='What are you looking for today ?'
					aria-label='Search'
					onChange={e => (queryRef.current = e.target.value)}
				/>
				<button
					class='btn btn-outline-success rounded-pill'
					type='submit'
					disabled={isLoading}>
					{isLoading ? Spinner({ sm: true }) : 'Search'}
				</button>
			</form>
		</nav>
	);
}

function FilterBar({ dispatch }) {
	return (
		<>
			<div className='d-inline-flex gap-2 justify-content-start'>
				<Filter
					type='SORT'
					title='Sort By'
					iconName='swap-vertical-outline'
					options={['Price', 'Marketplace', 'Ratings']}
					dispatch={dispatch}
				/>
				<Filter
					type='RANGE'
					title='Price'
					iconName='cash-outline'
					dispatch={dispatch}
					objProperty='price'
				/>
			</div>
		</>
	);
}

function Filter({ type, title, options, iconName, objProperty, dispatch }) {
	const initialConditions = {
		selectedIndex: -1,
		sortOrder: 0,
		range: [0, Number.MAX_SAFE_INTEGER, false],
	};
	const [conditions, setConditions] = useState(initialConditions);

	function updateCondition(current, attribute, newValue) {
		const nc = { ...current };
		nc[attribute] = newValue;
		return nc;
	}

	function getDropdownContentBasedOnType() {
		const filterFunction = e => e;
		const data = {};
		const filterKey = `${type}:${title}`;
		data[filterKey] = filterFunction;

		switch (type) {
			case 'SORT':
				if (conditions.selectedIndex > -1 && conditions.sortOrder === 0) {
					setConditions(c => updateCondition(c, 'sortOrder', -1));
				}

				return (
					<>
						<li class='dropdown-item'>
							<div class='form-check'>
								<input
									class='form-check-input'
									type='radio'
									name='radioSortOrder'
									id={title + 'radioAscending'}
									checked={
										!isEmpty(conditions) &&
										conditions.sortOrder === -1 &&
										conditions.selectedIndex > -1
									}
									onChange={e => {
										setConditions(c => updateCondition(c, 'sortOrder', -1));
										dispatchAddFilterForSort(data, filterKey);
									}}
								/>
								<label class='form-check-label' for='radioSortOrder'>
									Low to High
								</label>
							</div>
						</li>

						<li class='dropdown-item'>
							<div class='form-check'>
								<input
									class='form-check-input'
									type='radio'
									name='radioSortOrder'
									id={title + 'radioDescending'}
									checked={
										!isEmpty(conditions) &&
										conditions.sortOrder === 1 &&
										conditions.selectedIndex > -1
									}
									onChange={e => {
										setConditions(c => updateCondition(c, 'sortOrder', 1));
										dispatchAddFilterForSort(data, filterKey);
									}}
								/>
								<label class='form-check-label' for='radioSortOrder'>
									High to Low
								</label>
							</div>
						</li>
						<li>
							<hr class='dropdown-divider' />
						</li>
						{options.map((i, index) => (
							<li class='dropdown-item' key={type + index + 'li'}>
								<div class='form-check'>
									<input
										class='form-check-input'
										type='radio'
										name={title + 'radio'}
										id={title + 'radio' + index + type}
										checked={
											!isEmpty(conditions) &&
											conditions.selectedIndex === index
										}
										onChange={e => {
											setConditions(c =>
												updateCondition(c, 'selectedIndex', index)
											);
											dispatchAddFilterForSort(data, filterKey);
										}}
									/>
									<label
										class='form-check-label'
										for={title + 'radio' + index + type}>
										{i}
									</label>
								</div>
							</li>
						))}
					</>
				);
			case 'RANGE':
				return (
					<>
						<li class='dropdown-item fs-6'>
							<div class='input-group mb-3'>
								<span class='input-group-text'>Min</span>

								<input
									type='text'
									class='form-control'
									aria-label='Dollar amount (with dot and two decimal places)'
									value={!isEmpty(conditions) ? conditions.range[0] : 0}
									onChange={e => {
										if (e.target.value < conditions['range'][1]) {
											setConditions(c =>
												updateCondition(c, 'range', [
													Math.max(e.target.value, 0),
													c.range[1],
													c.range[2],
												])
											);

											//update filters in appState
											data[filterKey] = p =>
												p[objProperty] >= conditions.range[0] &&
												p[objProperty] <= conditions.range[1];
											dispatch({ type: 'ADD_FILTER', data });
										}
									}}
									placeholder='Min'
								/>
							</div>

							<div class='input-group'>
								<input
									type='number'
									class='form-control'
									aria-label='Dollar amount (with dot and two decimal places)'
									value={!isEmpty(conditions) ? conditions.range[1] : 100}
									onChange={e => {
										if (conditions['range'][0] < e.target.value)
											setConditions(c =>
												updateCondition(conditions, 'range', [
													c.range[0],
													Math.min(
														e.target.value,
														Number.MAX_SAFE_INTEGER
													),
													c.range[2],
												])
											);
									}}
									placeholder='max'
								/>
								<span class='input-group-text'>Max</span>
							</div>
						</li>
					</>
				);
			default:
				return <></>;
		}
	}
	function dispatchAddFilterForSort(data, filterKey) {
		if (conditions['selectedIndex'] > -1 && conditions['sortOrder'] != 0) {
			const filterAttribute = options[conditions['selectedIndex']];
			const ascendingFilterFunction = (a, b) => {
				if (a[filterAttribute] > b[filterAttribute]) return 1;
				else if (a[filterAttribute] < b[filterAttribute]) return -1;
				return 0;
			};

			const descendingFilterFunction = (a, b) => {
				if (a[filterAttribute] > b[filterAttribute]) return 1;
				else if (a[filterAttribute] < b[filterAttribute]) return -1;
				return 0;
			};
			data[filterKey] =
				conditions['sortOrder'] == -1 ? ascendingFilterFunction : descendingFilterFunction;
			dispatch({ type: 'ADD_FILTER', data });
		} else {
			dispatch({ type: 'ADD_FILTER', data });
		}
	}
	return (
		<div class='btn-group'>
			<button type='button' class='btn btn-outline-secondary text-center rounded-start-pill'>
				<ion-icon name={iconName} class='me-2'></ion-icon>
				{title}
			</button>
			<button
				type='button'
				class='btn btn-outline-secondary dropdown-toggle dropdown-toggle-split rounded-end-circle'
				data-bs-toggle='dropdown'
				aria-expanded='false'>
				<span class='visually-hidden'>Toggle Dropdown</span>
			</button>
			<ul class='dropdown-menu w-auto'>
				{getDropdownContentBasedOnType()}
				<li>
					<hr class='dropdown-divider' />
				</li>
				<li class='dropdown-item fs-6'>
					<button
						type='button'
						class='btn btn-danger btn-sm rounded-pill'
						onClick={_e => setConditions({})}>
						Clear Filter
					</button>
				</li>
			</ul>
		</div>
	);
}

function ProductResults({ searchResults, searchResCode, dispatch }) {
	const products = searchResults;
	if (products && products.length > 0 && searchResCode != -1) {
		return (
			<div className='container-fluid d-flex flex-column gap-2 px-4'>
				<FilterBar dispatch={dispatch} />
				<h3>Search Results</h3>
				<div className='d-inline-flex flex-wrap justify-content-between gap-2'>
					{products &&
						products.length > 0 &&
						products.map(p => {
							return (
								<ProductCard
									key={p.productUrl}
									title={p.title.substring(0, 20)}
									rating={p.rating}
									imgSrc={p.imgSrc}
									marketplace={p.marketplace}
									price={p.price}
									currency={p.currency}
									productURL={p.productURL}
									noOfRatings={p.noOfRatings}
								/>
							);
						})}
				</div>
			</div>
		);
	} else {
		return (
			<div className='container-fluid d-flex flex-grow-1 justify-contents-center align-items-middle flex-column gap-2 px-4 text-center '>
				<img
					src='../assets/search.svg'
					class='img-fluid mx-auto d-block w-25'
					alt='Search to find results'
				/>
				<span class='text-body-secondary'>Search for a product to see results</span>
			</div>
		);
	}
}

function ProductCard({
	title,
	rating,
	imgSrc,
	marketplace,
	price,
	currency,
	productURL,
	noOfRatings,
}) {
	const finalRating = Math.round(rating);
	return (
		<div
			class='card'
			style={{ minWidth: 'min-content', maxWidth: '240px', overflow: 'hidden' }}>
			<div class='card-body text-truncate text-nowrap' style={{ minWidth: '0' }}>
				<img
					src={imgSrc}
					class='card-img-top img-responsive'
					alt={title + ' from ' + marketplace}
					style={{ width: '240px', height: '280px', objectFit: 'cover' }}
				/>
			</div>
			<h5 class='px-2 card-title text-truncate'>
				<a
					href={productURL}
					style={{ minWidth: '0px', maxWidth: '240px' }}
					target='_blank'
					rel='noopener noreferrer'>
					{title.substring(0, 30) + (title.length > 25 ? '...' : '')}
				</a>
			</h5>
			<p class='card-text px-2 m-0'>
				<div class='ratings'>
					<span class='me-2 review-count fs-6 text-body-secondary'>{rating}</span>
					{Array(5)
						.fill()
						.map((_e, i) => i < finalRating)
						.map(v =>
							v ? (
								<ion-icon name='star'></ion-icon>
							) : (
								<ion-icon name='star-outline'></ion-icon>
							)
						)}
					<span class='ms-2 review-count fs-6 text-body-secondary'>{noOfRatings}</span>
				</div>
			</p>

			<div class='card-footer text-body-secondary d-flex justify-content-between fw-bold'>
				{price} <span class='badge text-bg-primary'>{marketplace}</span>
			</div>
		</div>
	);
}

function Search() {
	return <input type='text' placeholder='What are you looking for?' />;
}

/**
 * Fetch the products based on the query
 * @param {String} query
 * @returns Array of product details
 */
async function fetchProducts(query) {
	const response = await fetch(`${SERVER_URL}/search?product_name=${query}`);
	const res = await response.json();
	let fres = res
		.map(p => ({
			title: p['title'],
			imgSrc: p['images'],
			productURL: p['link'],
			rating: p['rating'],
			noOfRatings: p['no of ratings'],
			price: p['price'],
			marketplace: p['website'],
		}))
		.map(p => {
			const similarity = smithWatermanSimilarity(query, p.title);
			return { ...p, relevance: similarity['score'] };
		})
		.sort((p1, p2) => {
			return Math.sign(p1 - p2);
		});
	return fres;
}

/**
 * Calculate smith-waterman distance between two strings to evaluate their similarity
 * @param {String} s1
 * @param {String} s2
 * @param {Number} match Score given if characters match
 * @param {Number} mismatch Penalty value if characters don't match
 * @param {Number} gap Penalty if found a gap in sequence
 * @returns Object with a score attribute
 */
function smithWatermanSimilarity(s1, s2, match = 1, mismatch = -1, gap = -2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();
	const n = s1.length;
	const m = s2.length;

	const matrix = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

	let maxScore = 0;
	let maxI = 0;
	let maxJ = 0;

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			if (s1[i - 1] === s2[j - 1]) {
				matrix[i][j] = Math.max(0, matrix[i - 1][j - 1] + match);
			} else {
				matrix[i][j] = Math.max(
					0,
					matrix[i - 1][j] + gap,
					matrix[i][j - 1] + gap,
					matrix[i - 1][j - 1] + mismatch
				);
			}

			if (matrix[i][j] > maxScore) {
				maxScore = matrix[i][j];
				maxI = i;
				maxJ = j;
			}
		}
	}

	let i = maxI;
	let j = maxJ;
	let alignmentS1 = '';
	let alignmentS2 = '';

	while (i > 0 && j > 0 && matrix[i][j] > 0) {
		if (matrix[i][j] === matrix[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? match : mismatch)) {
			alignmentS1 = s1[i - 1] + alignmentS1;
			alignmentS2 = s2[j - 1] + alignmentS2;
			i--;
			j--;
		} else if (i > 0 && (j === 0 || matrix[i][j] === matrix[i - 1][j] + gap)) {
			alignmentS1 = s1[i - 1] + alignmentS1;
			alignmentS2 = '-' + alignmentS2;
			i--;
		} else {
			alignmentS1 = '-' + alignmentS1;
			alignmentS2 = s2[j - 1] + alignmentS2;
			j--;
		}
	}

	return { alignmentS1, alignmentS2, score: maxScore };
}

/**
 * Compares if two objects are completely equal or not
 * @param {Object} o1
 * @param {Object} o2
 * @returns boolean
 */
function deepEquals(o1, o2) {
	if (o1 && o2) return JSON.stringify(o1) === JSON.stringify(o2);
	else if (!o1 && !o2) return true;
	else return false;
}

/**
 * Applies sorting and filter functions given in the @filters object on the @results array
 * @param {Object} filters
 * @param {Array} results
 * @returns result array
 */
function filterSearchResults(filters, results) {
	if (!filters || results.length === 0 || (filters && isEmpty(filters))) return results;

	let finalResults = results;
	const rangeBasedFilters = Object.entries(filters).filter(fe => {
		return fe[0].startsWith('RANGE');
	});
	const sortingFilters = Object.entries(filters).filter(fe => {
		return fe[0].startsWith('SORT');
	});

	if (rangeBasedFilters && rangeBasedFilters.length > 0) {
		finalResults = rangeBasedFilters.reduce((fRes, currFe) => {
			return fRes.filter(currFe[1]);
		}, finalResults);
	}
	if (sortingFilters && sortingFilters.length > 0) {
		finalResults = rangeBasedFilters.reduce((fRes, currFe) => {
			return fRes.sort(currFe[1]);
		}, finalResults);
	}
	return finalResults;
}

/**
 * Checks if a JS object is empty or not
 * @param {*} obj
 * @returns
 */
function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}
