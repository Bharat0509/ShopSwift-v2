import { Document, Model, Query } from "mongoose";

export interface QueryString {
    [key: string]: string | number;
}

class ApiFilter<T extends Document> {
    query: Query<T[], T>;
    queryStr: QueryString;

    constructor(query: Query<T[], T>, queryStr: QueryString) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(): this {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword as string,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(): this {
        const queryCopy: QueryString = { ...this.queryStr };
        if (queryCopy["category"] === "all" || queryCopy["category"] === "") {
            delete queryCopy["category"];
        }
        // Removing some field for category
        const removeFields: string[] = ["keyword", "page", "limit"];

        removeFields.forEach((key: string) => delete queryCopy[key]);

        // Filter for Price Section
        let queryStr: string = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (key: string) => `$${key}`
        );

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort(): this {
        let sortBy: string = "";
        if (this.queryStr.sort) {
            sortBy = (this.queryStr.sort as string).split(",").join(" ");
        }
        if (sortBy.length) this.query = this.query.sort(sortBy);

        return this;
    }

    pagination(resultPerPage: number): this {
        const currentPage: number = Number(this.queryStr.page) || 1;
        const skip: number = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

export default ApiFilter;
