class Product {
  constructor(id, ownerId, title, imageUrl, description, costumerType, score, lowestScore,highestScore,minScoreBreak, maxScoreBreak) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.costumerType = costumerType;
    this.score = score;
    this.lowestScore = lowestScore;
    this.highestScore = highestScore;
    this.minScoreBreak = minScoreBreak;
    this.maxScoreBreak = maxScoreBreak;
  }
}

export default Product;
