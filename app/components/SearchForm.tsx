

import { Search } from 'lucide-react';
import Form from 'next/form'
import SearchFormReset from './SearchFormReset';

const SearchForm = () => {
  
  const query = "Test";
  
  
  return (
    <Form 
      action="/" 
      scroll={false} 
      className="search-form"
    >
      <input 
        name="query"
        defaultValue=""
        className='search-input'
        placeholder="Search startups"
      />
      <div className='flex gap-2'>
        {query &&  <SearchFormReset />}
        <button 
          type="submit"
          className='search-btn text-white'
        >
          S
        </button>
      </div>
    </Form>
  )
}

export default SearchForm