import axios from "axios";

const marketplaceApi = axios.create({
  baseURL: "https://nc-marketplace-sem-3.onrender.com/",
});

export const getItems = (queries) => {
  const params = {
    params: queries,
  };

  return marketplaceApi.get("/api/items", params).then(({ data }) => {
    return data.items;
  });
};

export const getCategories = () => {
  return marketplaceApi.get("/api/categories").then(({ data }) => {
    return data.categories;
  });
};

export const postItem = (item) => {
  return marketplaceApi.post('/api/items', item).then(({data}) => {
    return data.item;
  })
}

export const getItem = (item_id) => {
  return marketplaceApi.get(`/api/items/${item_id}`).then(({data}) => {
    return data.item;
  })
}