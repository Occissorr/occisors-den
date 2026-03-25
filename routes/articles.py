from bson import ObjectId
import cloudinary
from flask import Blueprint, request, jsonify
from services.database import articles

# ---------------------------------------------------
# ARTICLES
# ---------------------------------------------------

bp = Blueprint("articles", __name__, url_prefix="/articles")

@bp.route("/fetch", methods=["GET"])
def get_articles():

    result = list(articles.find().sort("createdAt", -1))

    for r in result:
        r["_id"] = str(r["_id"])

    return jsonify(result)


@bp.route("/add", methods=["POST"])
def add_article():

    title = request.form.get("title")
    description = request.form.get("description")
    created_at = request.form.get("createdAt")
    link = request.form.get("link")

    image_file = request.files.get("image")

    image_url = None
    public_id = None

    if image_file:
        upload = cloudinary.uploader.upload(
            image_file,
            folder="occisor-den",
            use_filename=True
        )

        image_url = upload["secure_url"]
        public_id = upload["public_id"]

    article_data = {
        "title": title,
        "description": description,
        "createdAt": created_at,
        "image": image_url,
        "link": link,
        "public_id": public_id
    }

    inserted = articles.insert_one(article_data)

    return jsonify({
        "status": "ok",
        "id": str(inserted.inserted_id)
    })


@bp.route("/delete/<id>", methods=["DELETE"])
def delete_article(id):

    article = articles.find_one({"_id": ObjectId(id)})

    if not article:
        return jsonify({"error": "Article not found"}), 404

    public_id = article.get("public_id")

    if public_id:
        cloudinary.uploader.destroy(public_id)

    articles.delete_one({"_id": ObjectId(id)})

    return jsonify({"status": "deleted"})
