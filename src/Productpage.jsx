import React, { useState, useEffect, useCallback } from 'react';
import Productlist from './Productlist';
import { getProductList } from './api';
import Loading from './Loading';


function Productpage({username}) {

 
console.log("productpage is runnig");
  const [productList, setProductList] = useState([]);
  const [Query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [loding, setLoading] = useState(true);

  useEffect(function() {
    const xyz = getProductList();

    xyz.then(function(products) {
      setProductList(products);
      setLoading(false);
    });
  }, []);

  let data = productList.filter(function(item) {
    const lowerCaseTitle = item.title.toLowerCase();

    const lowerCaseQuery = Query.toLowerCase();
    return lowerCaseTitle.indexOf(lowerCaseQuery) != -1;
  });


  if (sort == 'price') {
    data.sort(function(x, y) {
      return y.price - x.price;
    });
  } else if (sort == 'name') {
    data.sort(function(x, y) {
      return x.title < y.title ? -1 : 1;
    });
  }


  function handlechange(event) {
    setQuery(event.target.value);
  }

  
  const handlesortchange= useCallback(
  function (event) {
    setSort(event.target.value);
  },
[]);

  console.log("setSort");
  
  if (loding) {
    return <Loading />;
  }

    

  return (
    <div>
      <div className=" flex justify-end mt-10 mr-20  ">
        <select
          className=" rounded-sm border-2  "
          onChange={handlesortchange}
          value={sort}
        >
          <option value="default"> Default Sorting </option>
          <option value="price"> Short by price : high to low</option>
          <option value="name"> Short by name</option>
          <option value="high"> Short by price : low to high</option>
        </select>
      </div>

      <div className=" flex justify-center mt-5 sm:flex px-10 py-2    ">
        <input
          value={Query}
          type="text"
          onChange={handlechange}
          className="border  border-blue-500 w-96 rounded-md px-20 py-2 "
          placeholder="Search for Products ,brands  "
        />
      </div>
      <Productlist Products={data} />
    </div>
  );
}

export default Productpage;
