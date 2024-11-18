"use client"

import { useState } from "react";
import { Input } from "./ui/input"

const StartUpForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form 
      action={() => {}}
      className='startup-form'  
    >
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input 
          id="title" 
          name="title" 
          className="startup-form_input"
          required
          placeholder="Startup Name" 
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
    </form>
  )
}

export default StartUpForm