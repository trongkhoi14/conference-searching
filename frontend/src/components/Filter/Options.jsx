//lấy dữ liệu từ danh sách để đưa vào dropdown
import React, { useEffect, useState } from 'react'
import useFilter from '../../hooks/useFilter'
import { Dropdown, Form, InputGroup, Image, ButtonGroup, Button } from 'react-bootstrap'

import searchIcon from '../../assets/imgs/search.png'
import useConference from '../../hooks/useConferences'
import { capitalizeFirstLetter } from '../../utils/formatWord'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'
const category = ["Conference", "Journal"]
const customStyles = {
   
    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? 'lightgray' : 'white',
        color: state.isFocused ? 'black' : 'gray',
        cursor: 'pointer',
        '&:hover': {
            background: 'lightgray', // Điều chỉnh màu nền khi hover
            color: 'black', // Điều chỉnh màu chữ khi hover
        },
    }),
};
const CustomOption = ({ innerProps, label, isSelected }) => (
    <div {...innerProps} className='d-flex align-items-start'>
        <input
            type="checkbox"
            checked={isSelected}
            onChange={() => { }}
            className='m-2'
        />
        <label style={{ fontWeight: isSelected ? 'bold' : 'normal' }} className='fs-6'>{label}</label>
    </div>
);
const Options = ({ label }) => {
    const { filterOptions } = useConference()
    const [tranformOptions, setTranformOptions] = useState([])
    const { addKeywords, sendFilter } = useFilter()
    const [statename, setStateName] = useState('')
    const location = useLocation();
    const pathname = location.pathname;
    useEffect(()=>{
      if(pathname === '/' || pathname === '/home'){
        setStateName('optionsSelected')
      }
      else setStateName('filterOptionsFollowed')
    }, [pathname])
    const handleOptionChange = (item) => {
        const selectedValues = item.map(option => option.label);
        addKeywords(statename, label, selectedValues)
        sendFilter(label, selectedValues)
    };
    useEffect(() => {
        let transformedState = []
        if (filterOptions !== null) {
            if (label === 'categories') {
                transformedState = category.map((item, index) => ({
                    value: index + 1,
                    label: item,
                }));
            } else if (filterOptions[label]) {
                transformedState = filterOptions[label].map((item, index) => ({
                    value: index + 1,
                    label: capitalizeFirstLetter(item),
                }));
            }

        }
        setTranformOptions(transformedState);
    }, [filterOptions, label, category]);


    return (
        <div>
            <Select
                isMulti={true}
                options={tranformOptions}
                value
                components={{ Option: CustomOption }}
                onChange={handleOptionChange}
                closeMenuOnSelect={false}
                styles={customStyles}
                placeholder="All"
                
            />
        </div>

    )
}

export default Options
