import { CButton, CFormSelect } from '@coreui/react';
import { useState } from 'react';
import { getAllCategory } from '../../../services/categories/categories.repository';
import styled from 'styled-components';
import useAsyncEffect from 'use-async-effect';
import { Tag } from 'types/Tag';
import { getAllTags } from '../../../services/tags/tags.repository';

function Filter({ onTagFilterChange, onCategoryFilterChange, reCall }: any) {
  const [optionsCategory, setOptionsCategory] = useState<any>([]);
  const [optionsTags, setOptionsTags] = useState<any>([]);
  const [categoryValue, setCategoryValue] = useState(0);
  const [TagValue, setTagValue] = useState(0);

  useAsyncEffect(async () => {
    const categoriesList = await getAllCategory();
    const tagsList = await getAllTags();
    setOptionsCategory([
      ...categoriesList.data.map((category: any) => {
        return { value: category.CategoryID, label: category.Title };
      }),
    ]);

    setOptionsTags([
      ...tagsList.data.map((tag: Tag) => {
        return { value: tag.TagID, label: tag.Title };
      }),
    ]);
  }, []);

  const handleChangeCategory = (e: any) => {
    setTagValue(0);
    setCategoryValue(e.target.value);
    return onCategoryFilterChange(e.target.value);
  };

  const handleChangeTag = (e: any) => {
    setCategoryValue(0);
    setTagValue(e.target.value);
    return onTagFilterChange(e.target.value);
  };

  const resetFilter = () => {
    setCategoryValue(0);
    setTagValue(0);
    reCall(true);
  };

  return (
    <Wrapper>
      <CustomSelect
        aria-label='Choose the category...'
        value={categoryValue}
        onChange={handleChangeCategory}>
        <option>Filter articles by category...</option>
        {optionsCategory.map((option: any) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </CustomSelect>

      <CustomSelect
        aria-label='Choose the category...'
        value={TagValue}
        onChange={handleChangeTag}>
        <option>Filter articles by tag...</option>
        {optionsTags.map((option: any) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </CustomSelect>
      <CButton color='secondary' onClick={resetFilter}>
        Reset Filter
      </CButton>
    </Wrapper>
  );
}

export default Filter;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CustomSelect = styled(CFormSelect)`
  width: 300px;
  margin: 20px;
`;

// const CustomButton = styled(CButton)``;
