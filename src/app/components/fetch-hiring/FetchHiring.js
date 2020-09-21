import React, { useEffect, useState } from 'react';
import './FetchHiring.css';

function FetchHiring() {
  const [ data, setData ] = useState();
  const [ filteredData, setFilteredData ] = useState();
  const [ error, setError ] = useState()
  const [ loading, setLoading ] = useState()

  // Effect to fetch and set `data`.
  useEffect(() => {
    let useEffectAborted = false;

    async function fetchFallbackData() {
      // Data retrieved by CURL GET request, via command line.
      let fallbackData = require('./FetchHiringData.json');
      let fallbackError = new Error('Unable to load fallback data.');

      (fallbackData) ? setData(fallbackData) : setError(fallbackError);
    };

    async function fetchData() {
      try {
        let url = 'https://fetch-hiring.s3.amazonaws.com/hiring.json';
        let fetchOptions = {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*'
          }
        };
  
        setLoading(true);

        let awsData = await fetch(url, fetchOptions);

        setData(awsData);
      } catch(error) {
        // NOTE: Access to fetch at 'https://fetch-hiring.s3.amazonaws.com/hiring.json' from origin 'http://localhost:3000' has been blocked by CORS policy.
        // TODO: Use proxy server to work around CORS policy.
        // Unable to fetch `awsData`, use fallback data instead.
        setError(error);
        fetchFallbackData();
      } finally {
        setLoading(false);
      };
    };

    if(!useEffectAborted) {
      fetchData();
    };

    return (() => { useEffectAborted = true; });
  }, [data]);

  // Effect to filter `data`.
  useEffect(() => {
    let useEffectAborted = false;

    /**
     * input: @param {array} data
     * output: @return {array} - Return filtered data, an array or objects
     * description: @todo
    **/
    async function filterData(data) {
      /**
       * Display this list of items to the user based on the following requirements:
       * 
       * @todo: Display all the items grouped by "listId"
       * Sort the results first by "listId" then by "name" when displaying.
       * @todo: Filter out any items where "name" is blank or null.
       * @todo: The final result should be displayed to the user in an easy-to-read list.
       * 
       */
      console.log(data);
    };

    if(!useEffectAborted && data) {
      filterData(data);
    };

    return (() => { useEffectAborted = true; });
  }, [data]);


  if(data) {
    return (
      <div className="o-fetch-hiring">
        <ul className="c-list">
          {
            data.map((item, i) => {
              return (
                <li key={i*i} className="c-list__item">{item.name}</li>
              )
            })
          }
        </ul>
      </div>
    )
  } else if(loading) {
    return <div className="o-loading">loading</div>
  } else if(error) {
    return <div className="o-error">{error.message}</div>
  } else {
    return null;
  };
};

export default FetchHiring;
