import category from "./schema";

const selectQuery = {
    id: category.id,
    title: category.title,
    question: category.question,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
};

export default {
    selectQuery,
};
