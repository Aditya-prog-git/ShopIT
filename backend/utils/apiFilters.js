class APIFilters {
  constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
      const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' //case insensitive
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filters(){
      const queryCopy = { ...this.queryStr };

      //removing fields from the query
      const fieldsToRemove = ['keyword', 'page'];
      fieldsToRemove.forEach(field => delete queryCopy[field]);

      //advanced filters for price, ratings etc
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }

    pagination(resPerPage){
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resPerPage * (currentPage - 1);

      this.query = this.query.limit(resPerPage).skip(skip);
      return this;
    }
}

export default APIFilters;