//lấy dữ liệu từ danh sách để đưa vào dropdown
import React, { useEffect, useState } from 'react'
import useFilter from '../../hooks/useFilter'
import { Dropdown, Form, InputGroup, Image, ButtonGroup, Button } from 'react-bootstrap'

import searchIcon from '../../assets/imgs/search.png'
import useConference from '../../hooks/useConferences'
import { capitalizeFirstLetter } from '../../utils/formatWord'
const category = ["Conference", "Journal"]

const Options = ({ label}) => {
    const {filterOptions} = useConference()
    
    const { addKeywords, sendFilter } = useFilter()
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputKeyword, setInputKeyword] = useState('')
    const [isOpenDropdown, setOpenDropdown] = useState(false)
    

    const handleShowDropDown = () => {
        setOpenDropdown(!isOpenDropdown)
    }
    const handleOptionChange = (item) => {
        if (selectedOptions.includes(item)) {
            setSelectedOptions(selectedOptions.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedOptions([...selectedOptions, item]);
        }
    };
    const handleApplyFilter = () => {
        if(inputKeyword !== ''){            
        addKeywords("input", inputKeyword)
        }
        addKeywords(label, selectedOptions)
        setOpenDropdown(!isOpenDropdown)
        sendFilter(label, selectedOptions)
    }

    return (
        <Dropdown className="w-100 " show={isOpenDropdown} autoClose="outside">
            <Dropdown.Toggle
                id="dropdown-autoclose-outside"
                onClick={() => handleShowDropDown()}
                className="w-100 d-flex justify-content-between align-items-center bg-white border-1 text-color-medium  border-dark-subtle">
                All
            </Dropdown.Toggle>
            <Dropdown.Menu className='shadow-sm py-0'>
                {
                    label !== "category" && label !== "hold" &&
                    <InputGroup className="px-2 pt-1 pb-0 border-0 w-100 bg-white">
                        <InputGroup.Text className="border-0 bg-blue-light">
                            <Image src={searchIcon} width={12} />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search"
                            className="border-0 px-2 fs-6 bg-blue-light"
                            onChange={(e) => setInputKeyword(e.target.value)}
                        />
                    </InputGroup>
                }
                <Dropdown.Divider />
                <Form className=' overflow-y-auto' style={{ maxHeight: "180px" }}>
                    {
                        label === 'category'
                            ?
                            category.map((item, index) => (
                                <div className='w-100 p-2' key={index}>
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        value={item._id}
                                        label={item}
                                        checked={selectedOptions.includes(item)}
                                        onChange={() => handleOptionChange(item)}
                                    />
                                </div>
                            ))
                            :

                            <>

                                {
                                    filterOptions !== undefined && filterOptions !== null
                                        ?
                                        filterOptions[label].map((item, index) => (
                                            <div className='w-100 p-2' key={index}>
                                                <Form.Check
                                                    key={index}
                                                    type="checkbox"
                                                    value={item._id}
                                                    label={capitalizeFirstLetter(item)}
                                                    checked={selectedOptions.includes(item)}
                                                    onChange={() => handleOptionChange(item)}
                                                />
                                            </div>
                                        ))
                                        :
                                        <div className='px-3 fs-6'>No available options</div>
                                }
                            </>
                    }
                </Form>
                <Dropdown.Divider />
                <ButtonGroup className='sticky-bottom w-100 bg-white px-2 pb-2'>
                    <Button
                        onClick={handleShowDropDown}
                        className='w-50 me-2 rounded-2 border-0 bg-secondary'>
                        Cancel
                    </Button>
                    <Button className='w-50 rounded-2 border-0 bg-primary-normal' onClick={handleApplyFilter}>
                        Apply
                    </Button>
                </ButtonGroup>
            </Dropdown.Menu>
        </Dropdown>

    )
}

export default Options