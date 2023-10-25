<p align="center"><img width="500" src="./assets/slash.png"></p>
<p align="center"> <em><span style="font-size:larger;">Slash your shopping bills, not your style</span></em>

</p>

[![GitHub license](https://img.shields.io/github/license/jashgopani/slash)](https://github.com/jashgopani/slash/blob/main/LICENSE)
[![DOI](https://zenodo.org/badge/706276006.svg)](https://zenodo.org/doi/10.5281/zenodo.10030696)
![Github](https://img.shields.io/badge/language-python-red.svg)
[![GitHub issues](https://img.shields.io/github/issues/jashgopani/slash)](https://github.com/jashgopani/slash/issues)
[![Github closes issues](https://img.shields.io/github/issues-closed-raw/jashgopani/slash)](https://github.com/jashgopani/slash/issues?q=is%3Aissue+is%3Aclosed)
[![Github closed pull requests](https://img.shields.io/github/issues-pr-closed/SEProjGrp5/slash)](https://github.com/jashgopani/slash/pulls?q=is%3Apr+is%3Aclosed)
[![Pylint](https://github.com/jashgopani/slash/actions/workflows/pylint.yml/badge.svg)](https://github.com/jashgopani/slash/actions/workflows/pylint.yml)
[![Python Style Checker](https://github.com/jashgopani/slash/actions/workflows/style_checker.yml/badge.svg)](https://github.com/jashgopani/slash/actions/workflows/style_checker.yml)

Slash is a tool that scrapes the most popular e-commerce websites to get the best deals on searched items across these websites.

- **Fast**: With slash, you can save over 50% of your time by comparing deals across websites within seconds
- **Easy**: Slash uses very easy commands to filter, sort and search your items
- **Powerful**: Quickly alter the commands to get desired results
<p align="center">
Checkout our newest Features! Mini Version and Full version now showcasing new sets of improvements.

# :movie_camera: Demo

[![Slash Demo](https://img.youtube.com/vi/4jWzkKmwJTM/0.jpg)](https://www.youtube.com/watch?v=4jWzkKmwJTM)

# :exclamation: Needed Software

1. Python 3 (Version 3.9.7 or lower)
2. Pip
3. Flask

# :rocket: Installation

## :floppy_disk: Initial Steps

1. Access the Github repository from your computer.

- First, pre-install [git](https://git-scm.com/) on your machine.
- Then, clone the following repo:

```
https://github.com/jashgopani/slash.git
```

- Finally, `cd` into the local repository.

```
cd slash
```

2. Install the `requirements.txt`.

- This project uses Python 3, so make sure that [Python](https://www.python.org/downloads/) and [Pip](https://pip.pypa.io/en/stable/installation/) are preinstalled.
- Install the `requirements.txt` file using pip.

```
pip3 install -r requirements.txt
```

<p>

## :key: Using the UI Version

1. After completing the <a href="#floppy_disk-initial-steps">Initial Steps</a> and all project dependencies are installed.

2. Make sure you are in the base directory.
3. Use the `python -m flask run` command.

```
MAC
export FLASK_APP=src/modules/app
python3 -m flask run

Windows
set FLASK_APP=src\modules\app
python -m flask run
```

4. Once flask is running, open your internet browser and type `http://127.0.0.1:5000/` into the search bar.

# :dizzy: What's New in Phase 4

## :computer: Updated UI

1. UI looks more polished
2. Added new components to the UI including:
   - Navbar
   - Filter bar
3. Fixed responsiveness bugs with the search bar
4. A smoother dropdown added to the UI
5. New layout where there is no table. Instead, it is a grid layout.
6. Responsive for any screen size, including smartphones.
7. PWA support to make the app cross-platform

<p align="center"><img width="700" src="./assets/Slash_UI.png"></p>

## :camera: Scraping images

We successfully scraped images from websites. This can be displayed in the UI.

<p align="center"><img width="200" src="./assets/Slash_Item.png"></p>

## :red_car: Created Diagram for Code Flow

Made a diagram to digest how the code flows for future contributors.

<p align="center"><img width="500" src="./docs/SlashDesignDiagram.png"></p>

## 💿: Deprecated Feature

We removed the command line interface as the UI is easier for the average user.

# :golf: How to Use the UI

## Search

There is a search bar that users will see when opening this application. Simply type the desired item in the box.

<p align="center"><img width="500" src="./assets/Slash_Search.png"></p>

## Sorting

You can sort by ratings or prices using the dropdown below the search bar.

<p align="center"><img width="300" src="./assets/Slash_Sort.png"></p>

## Grid of Items

There is a grid of items that shows all the items including name, ratings, price, store name, and an image of the item.

<p align="center"><img width="700" src="./assets/Slash_UI.png"></p>

# :muscle: What's next for future development?

<p align="center"><img width="700" src="./assets/SlashAnimation.gif"></p>

- Improve UX through UI enhancements like fixing bugs, micro-interactions, more filter and sorting options, dedicated product detail page
- Add price history tracking and notification and alerts feature
- Add more relevant information like coupons or promo codes from scraped results
- Upgrade PWA capabilities to give a more native like UX

## :thought_balloon: Use Case

- **_Students_**: Students coming to university are generally on a budget and time constraint and generally spend hours wasting time searching for products on Websites. Slash is the perfect tool for these students that slashes all the unnecessary details on a website and helps them get prices for a product across multiple websites. Make the most of this tool in the upcoming Black Friday Sale.
- **_Data Analysts_**: Finding data for any project is a tedious job for a data analyst, and the datasets found might not be the most recent one. Using slash, they can create their own dataset in real time and format it as per their needs so that they can focus on what is actually important. On top of this, finding data can be easily automated to suit the data analysts needs.

## :page_facing_up: Why Contribute to this project ?

- Revolutionize Shopping: Be a part of a project that's changing the way people shop online, making it more efficient and enjoyable.

- Tech-Powered Bargain Hunting: Contribute your tech skills to empower users with the ability to find the best deals across e-commerce platforms effortlessly.

- Elevate User Experience: Help create a tool that not only saves time but enhances the shopping experience through intuitive design and micro-interactions.

- Data Analyst's Dream: Assist data analysts by collecting and providing real-time data collection and formatting tools, simplifying their work and making it more efficient.

- Community Impact: Your contributions will directly impact students and budget-conscious shoppers, helping them save money and make informed purchase decisions, which is particularly impactful during sales events like Black Friday.

# :bulb: Motivation

We saw potential in this as e-commerce is a very common tool that people use to buy online. Even so, it can be hard to find the best item based on ratings and prices. This usually requires several tabs for Amazon, Walmart, and other stores. With Slash, this can be made easy, which resonated with the group. We strived to add to this as we would like a fully functioning version of Slash in order to make shopping online easier.

# :sparkles: Contributors

- Akhilesh Neeruganti
- Jash Gopani
- Rohan Ajmera
- Hemil Mehta

## :email: Support

For any queries and help, please reach out to us at: neerua08@gmail.com
