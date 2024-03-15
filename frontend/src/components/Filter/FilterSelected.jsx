

import { Button, Image } from 'react-bootstrap'

import deleteIcon from "../../assets/imgs/del.png";
import RedDeleteIcon from "../../assets/imgs/redDel.png";
import useFilter from "../../hooks/useFilter";
import useConference from "../../hooks/useConferences";
import { findKeyByKeyword, mergeAndCountUniqueValues } from "../../utils/checkFetchedResults";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const FilterSelected = () => {
  const { optionsSelected, deleteKeyword, clearKeywords } = useFilter()
  
  const {handleGetList} = useConference()
  const [statename, setStateName] = useState('')
  const [keywordsSelected, setKeywordsSelected] = useState(null)
  const [totalCount, setCount] = useState(null)
  useEffect(()=>{
    setStateName('optionsSelected')
    const tempList = mergeAndCountUniqueValues(optionsSelected)
    setCount(tempList.totalCount)
    setKeywordsSelected(tempList)
  }, [optionsSelected])
  
  const handleClearKeyword = () => {
    clearKeywords(statename)
    handleGetList()
  }
  return (
    <>
      {
        totalCount > 0
          ?
          <div className="d-flex flex-wrap border-1 border border-light-subtle p-3 my-3 rounded-3">
            {keywordsSelected.uniqueValues.map((keyword, index) => (
              <div
                onClick={() => { deleteKeyword(statename, findKeyByKeyword(optionsSelected, keyword),keyword) }}
                key={index}
                className="fs-6 py-1 px-2 fw-bold border border-secondary rounded-pill d me-3 mb-3  d-flex align-items-center">
                {keyword}
                <Button
                 
                  className="border-0 p-0  bg-transparent  d-flex align-items-center">
                  <Image width={20} src={deleteIcon} alt="" className="ms-1" />
                </Button>
              </div>
              ))}

            <Button
              onClick={()=>handleClearKeyword()}
              className="fs-6 py-1 px-2 fw-bold border border-danger bg-white text-red-normal rounded-pill d me-3 mb-3  d-flex align-items-center">

              Reset All
              <Image width={20} src={RedDeleteIcon} alt="" className="ms-1" />
            </Button>
          </div>
          :
          <></>

      }
    </>

  );
};

export default FilterSelected;