import React, { useEffect, useState } from 'react';
import * as utils from './utilities';
import DataListing from './DataListing';
import './DataList.css';

const DataList = ({ data }) => {
  const [ dataGroups, setDataGroups ] = useState();
  const [ error, setError ] = useState();
  const [ processing, setProcessing ] = useState();

  // Effect to filter datasets within each group.
  useEffect(() => {
    async function filterDataGroups() {
      setProcessing(true);

      try {
        const orderedGroups = [];

        data.forEach(group => {
          orderedGroups.push(utils.orderDataByName(group));
        });

        let processingError = new Error('Unable to order data groups.');

        (orderedGroups) ? setDataGroups(orderedGroups) : setError(processingError);
      } catch(error) {
        setError(error);
      } finally {
        setProcessing(false);
      };
    };

    let useEffectAborted = false;

    if(!useEffectAborted && data && !dataGroups) {
      filterDataGroups();
    };

    return (() => { useEffectAborted = true; });
  }, [data, dataGroups]);

  if(processing) {
    return <div className="o-processing">processing...</div>
  } else if(error) {
    return <div className="o-error">{error.message}</div>
  } else if(dataGroups) {
    return (
      <div className="o-data-list">
          {
            dataGroups.map((dataGroups, i) => {
              return (
                <ul key={i*i} className="c-list">
                  <h1 className="c-list__title">{`'listId' group ${i+1}`}</h1>
                  <div className="c-list__content">
                    {
                      dataGroups.map((item, j) => {
                        return (
                          <DataListing key={j*j} listing={item} />
                        );
                      })
                    }
                  </div>
                </ul>
              )
            })
          }
      </div>
    );
  } else {
    return null;
  };

};

export default DataList;