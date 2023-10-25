from flask import Flask, request, send_from_directory
from flask.json import jsonify
from src.scraper import driver

app = Flask(__name__, static_folder='./frontend', static_url_path='')


@app.route("/")
def landingpage():
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/search", methods=["GET"])
def product_search(new_product="", sort=None, currency=None, num=None):
    product = request.args.get("product_name")
    print('search route triggered for: '+str(prod))
    if product is None:
        product = new_product
    data = driver(product, currency, num, 0, False, None, True, sort)
    return jsonify(data)

@app.route("/searchdebug", methods=["GET"])
def product_searchdebug(new_product=""):
    print('searchdebug route triggered')
    product = request.args.get("product_name")
    return jsonify(["you searched for - ",str(product)]);
