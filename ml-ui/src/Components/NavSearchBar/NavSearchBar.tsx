import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '../../utils';

// styles
import './NavSearchBar.scss';

// interface NavSearchBarProps {
//   onSubmit: (searchText:string) => void
// }

export const NavSearchBar: FunctionComponent = () => {

  let query = useQuery();
  let search = query.get('search');
  /**
   * State
   */
  const [searchValue, setSearchValue] = useState(search || '');
  /**
   * History
   */
  const history = useHistory();


  const onChangeSearchBox = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchValue(text)
  }
  
  const handleSubmit = () => {
    history.push(`/items?search=${searchValue}`);
  }

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      handleSubmit();
    }
  }

  return <div className="nav-layout">
    <div className="container content">
      <img src="/assets/Logo_ML.png" alt="mercado libre" className="logo"/>
      <div className="search">
        <input 
          type="text" 
          className="search-box" 
          value={searchValue} 
          placeholder="No dejes de buscar"
          onChange={onChangeSearchBox}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="search-btn" 
          onClick={handleSubmit}
        >
          <img src="/assets/ic_Search.png" alt="search" className="search-icon"/>
        </button>
      </div>
    </div>
  </div>
}