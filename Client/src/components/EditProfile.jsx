import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Pencil } from 'lucide-react'
import api from '../utils/axios'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate()
  const { updateUser } = useContext(AuthContext)

  const handleSave = async () => {
    try {
      await updateUser(form)
      alert('Profile updated successfully')
    } catch (err) {
      alert('Update failed')
    }
  }
  const { user } = useContext(AuthContext)

  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: '',
    married: '',
    dob: ''
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleOption = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  return (
    <div className='bg-white rounded-xl shadow-sm p-6 md:p-10'>
      {/* 🔥 HEADER */}
      <div className='flex items-center gap-6 mb-10'>
        <div className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl'>
          👤
        </div>

        <h1 className='text-3xl md:text-4xl font-semibold'>
          {form.firstName} {form.lastName}
        </h1>
      </div>

      {/* 🔥 ACCOUNT DETAILS */}
      <h2 className='text-lg font-semibold mb-5'>Account Details</h2>

      <div className='grid md:grid-cols-2 gap-8 mb-10'>
        {/* PHONE */}
        <div>
          <label className='text-sm text-gray-600'>Mobile Number</label>

          <input
            value={form.phone}
            disabled
            className='w-full mt-1 px-4 py-3 rounded-xl border bg-gray-50'
          />
        </div>

        {/* EMAIL */}
        <div>
          <div className='flex justify-between items-center mb-1'>
            <label className='text-sm text-gray-600'>Email Address</label>

            <button
              onClick={() => navigate('/update-email')}
              className='flex items-center gap-1 text-sm text-purple-600 font-medium group'
            >
              <Pencil size={16} className='group-hover:rotate-12 transition' />
              <span className='group-hover:underline'>Edit</span>
            </button>
          </div>

          <input
            value={form.email}
            disabled
            className='w-full px-4 py-3 rounded-xl border bg-gray-50'
          />
        </div>
      </div>

      {/* 🔥 PERSONAL DETAILS */}
      <h2 className='text-lg font-semibold mb-5'>Personal Details</h2>

      <div className='grid md:grid-cols-2 gap-8 mb-6'>
        <input
          name='firstName'
          value={form.firstName}
          onChange={handleChange}
          placeholder='First Name'
          className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition'
        />

        <input
          name='lastName'
          value={form.lastName}
          onChange={handleChange}
          placeholder='Last Name'
          className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition'
        />
      </div>

      <div className='grid md:grid-cols-2 gap-8 mb-6'>
        {/* DOB */}
        <input
          type='date'
          name='dob'
          value={form.dob}
          onChange={handleChange}
          className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition'
        />

        {/* GENDER */}
        <div>
          <p className='text-sm mb-2 text-gray-600'>Identity (Optional)</p>

          <div className='flex gap-3'>
            {['Male', 'Female'].map(g => (
              <button
                key={g}
                onClick={() => toggleOption('gender', g)}
                className={`px-5 py-2 rounded-xl border text-sm transition ${
                  form.gender === g
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 MARRIED */}
      <div className='mb-8'>
        <p className='text-sm mb-2 text-gray-600'>Married? (Optional)</p>

        <div className='flex gap-3'>
          {['Yes', 'No'].map(m => (
            <button
              key={m}
              onClick={() => toggleOption('married', m)}
              className={`px-5 py-2 rounded-xl border text-sm transition ${
                form.married === m
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleSave}
        className='mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition'
      >
        Save Changes
      </button>
      {/* 🔥 FOOTER */}
      <div className='text-xs text-gray-500 text-center mt-8'>
        By proceeding, you agree to Terms & Conditions and Privacy Policy
      </div>
    </div>
  )
}

export default EditProfile
