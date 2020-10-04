import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    
    const userId = getState().auth.userId;
    const token = getState().auth.token;
 
    try {
      const response = await fetch(
         `https://matchscore-72cf1.firebaseio.com/products.json?auth=${token}`      
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      } 

      const resData = await response.json();
      const loadedProducts = [];
      const filterby = []; 

      for (const key in resData) {
    
        loadedProducts.push(          
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].costumerType,
            resData[key].score
          )
        );
      };      
      
      console.log(loadedProducts);
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts.filter(prod => prod.ownerId != userId && prod.costumerType !=filterby),//filtro ALL -LOGADO
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId),//perfil filtrado = usuario logado
        disciples: loadedProducts.filter(prod => prod.ownerId != userId && prod.costumerType === "3")
      });
    } catch (err) {
      
      throw err;
    }
  };
};

export const fetchAcademies = () => {
  return async (dispatch, getState) => {
    
    const userId = getState().auth.userId;
    const token = getState().auth.token;
 
    try {
      const response = await fetch(
         `https://matchscore-72cf1.firebaseio.com/products.json?auth=${token}`   
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {              
        loadedProducts.push(          
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].costumerType,
            resData[key].score,
          )
        );
      };      
      
      console.log(loadedProducts);
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts.filter(prod => prod.ownerId === userId /*&& prod.costumerType === "1"*/),//todas as partidas do usuario preview/overview)
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId),//lista apenas perfil do usuario logado podendo criar/editar/deletar        
      });
    } catch (err) {      
      throw err;
    }
  };
};             

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://matchscore-72cf1.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, costumerType, score) => {
  return async (dispatch, getState) => {
 
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(    
      `https://matchscore-72cf1.firebaseio.com/products.json?auth=${token}`,  
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          costumerType,
          score,
          ownerId: userId
        })
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        costumerType,
        score,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, costumerType, score) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://matchscore-72cf1.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          costumerType,
          score          
        })
      }
    );

    // if (!response.ok) {
    //   throw new Error('Something went wrong!');
    // }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        costumerType,
        score         
      }
    });
  };
};
