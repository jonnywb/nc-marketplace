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
  return marketplaceApi.post("/api/items", item).then(({ data }) => {
    return data.item;
  });
};

export const getItem = (item_id) => {
  return marketplaceApi.get(`/api/items/${item_id}`).then(({ data }) => {
    return data.item;
  });
};

export const getUserByUsername = (username) => {
  return marketplaceApi.get(`/api/users/${username}`).then(({data}) => {
    return data.user
  })
}

export const postToBasket = (username, body) => {
  return marketplaceApi.post(`/api/users/${username}/basket`, body).then(({data}) => {
    return data.item
  })
}

export const getBasketItems = (username) => {
  return marketplaceApi.get(`/api/users/${username}/basket`).then(({data}) => {
    return data.items
  })
}

export const deleteFromBasket = (username, item_id) => {
  return marketplaceApi.delete(`/api/users/${username}/basket/${item_id}`).then(() => {
  })
}