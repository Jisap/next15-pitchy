
import Form from 'next/form'
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';


const SearchForm = ({ query }:{ query?: string }) => {
  
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
        {/* {El formulario Form actualiza los searchParams en la URL.} */}
        <button 
          type="submit"
          className='search-btn text-white'
        >
          <Search className='size-5'/>
        </button>
      </div>
    </Form>
  )
}

export default SearchForm