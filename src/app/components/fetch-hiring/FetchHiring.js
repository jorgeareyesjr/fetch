import React, { useEffect, useState } from 'react';
import * as utils from './utilities';
import DataList from './DataList';

function FetchHiring() {
  const [ data, setData ] = useState();
  const [ processedData, setProcessedData ] = useState();
  const [ error, setError ] = useState();
  const [ loading, setLoading ] = useState();
  const [ processing, setProcessing ] = useState();

  // Effect to fetch and set `data`.
  useEffect(() => {
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
        // setError(error);
        fetchFallbackData();
      } finally {
        setLoading(false);
      };
    };

    let useEffectAborted = false;

    if(!useEffectAborted) {
      fetchData();
    };

    return (() => { useEffectAborted = true; });
  }, [data]);

  // Effect to process `data`.
  useEffect(() => {
    async function filterData() {
      /**
       * Display this list of items to the user based on the following requirements:
       * Display all the items grouped by "listId"
       * Sort the results first by "listId" then by "name" when displaying.
       * Filter out any items where "name" is blank or null.
       * The final result should be displayed to the user in an easy-to-read list.
      **/
      setProcessing(true);
      
      try {
        let sortedData = await utils.sortDataByKey(data, 'listId');
        let filteredData = await utils.filterDataByKey(sortedData, 'name');
        let dataGroupsMap = await utils.mapDataGroupsByKey(filteredData, 'listId');
        let dataGroupsArr = await Array.from(dataGroupsMap.values());
        let processingError = new Error('Unable to process data.');

        (dataGroupsArr) ? setProcessedData(dataGroupsArr) : setError(processingError);
      } catch(error) {
        setError(error.message)
      } finally {
        setProcessing(false);
      };
    };

    let useEffectAborted = false;

    if(!useEffectAborted && data && !processedData) {
      filterData();
    };

    return (() => { useEffectAborted = true; });
  }, [data, processedData]);


  if(loading) {
    return <div className="o-loading">loading...</div>
  } else if(processing) {
    return <div className="o-processing">processing...</div>
  } else if(error) {
    return <div className="o-error">{error.message}</div>
  } else if(processedData) {
    return (
      <DataList data={processedData} />
    )
  } else {
    return null;
  };
};

export default FetchHiring;
