from flask import Flask, request, redirect
from flask.json import jsonify
from src.scraper import driver

app = Flask(__name__, template_folder=".")


@app.route("/")
def landingpage():
    return redirect("https://slash-frontend.vercel.app/", code=302)


@app.route("/search", methods=["POST", "GET"])
def product_search(new_product="", sort=None, currency=None, num=None):
    product = request.args.get("product_name")
    if product is None:
        product = new_product

    data = driver(product, currency, num, 0, False, None, True, sort)

    # print(data)
    # print(json.dumps(data))
    return jsonify(data)
    # return render_template("./static/result.html", data=data, prod=product)


@app.route("/filter", methods=["POST", "GET"])
def product_search_filtered():

    product = request.args.get("product_name")
    sort = request.form["sort"]
    currency = request.form["currency"]
    num = request.form["num"]

    if sort == "default":
        sort = None
    if currency == "usd":
        currency = None
    if num == "default":
        num = None
    return product_search(product, sort, currency, num)
