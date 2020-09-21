import React, { useEffect, useState } from 'react';
import './FetchHiring.css';

function FetchHiring() {
  const [ data, setData ] = useState();
  const [ error, setError ] = useState()
  const [ loading, setLoading ] = useState()

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
