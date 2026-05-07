import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Pencil, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useContext(AuthContext)

  const [isSaving, setIsSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })

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
    setStatusMessage({ type: '', text: '' }) // Clear message on typing
  }

  const toggleOption = (field, value) => {
    setForm({ ...form, [field]: value })
    setStatusMessage({ type: '', text: '' })
  }

  // 🔥 UPGRADE: Added Loading States and Inline Status Messages (No more alerts!)
  const handleSave = async () => {
    setIsSaving(true)
    setStatusMessage({ type: '', text: '' })

    try {
      await updateUser(form)
      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' })
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 w-full max-w-3xl mx-auto'>
      
      {/* 🔥 HEADER & AVATAR */}
      <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 text-center sm:text-left'>
        
        {/* Dynamic Initial Avatar */}
        <div className='w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0'>
          {form.firstName ? form.firstName[0].toUpperCase() : 'U'}
        </div>

        <div className="mt-2 sm:mt-4">
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>
            {form.firstName} {form.lastName}
          </h1>
          <p className="text-gray-500 mt-1">Manage your personal information and preferences.</p>
        </div>
      </div>

      {/* 🔥 INLINE STATUS MESSAGE */}
      {statusMessage.text && (
        <div className={`flex items-center gap-3 p-4 rounded-xl mb-8 border ${
          statusMessage.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="text-sm font-medium">{statusMessage.text}</p>
        </div>
      )}

      {/* 🔥 ACCOUNT DETAILS */}
      <h2 className='text-lg font-bold text-gray-900 mb-5 border-b pb-2'>Account Details</h2>

      <div className='grid sm:grid-cols-2 gap-6 sm:gap-8 mb-10'>
        {/* PHONE */}
        <div>
          <label className='text-sm font-medium text-gray-700'>Mobile Number</label>
          <input
            value={form.phone}
            disabled
            className='w-full mt-1.5 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
          />
        </div>

        {/* EMAIL */}
        <div>
          <div className='flex justify-between items-center mb-1.5'>
            <label className='text-sm font-medium text-gray-700'>Email Address</label>
            <button
              onClick={() => navigate('/update-email')}
              className='flex items-center gap-1 text-xs text-purple-600 font-bold uppercase tracking-wider hover:text-purple-700 transition group'
            >
              <Pencil size={14} className='group-hover:-translate-y-0.5 transition-transform' />
              <span>Edit</span>
            </button>
          </div>
          <input
            value={form.email}
            disabled
            className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
          />
        </div>
      </div>

      {/* 🔥 PERSONAL DETAILS */}
      <h2 className='text-lg font-bold text-gray-900 mb-5 border-b pb-2'>Personal Details</h2>

      <div className='grid sm:grid-cols-2 gap-6 sm:gap-8 mb-6'>
        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>First Name</label>
          <input
            name='firstName'
            value={form.firstName}
            onChange={handleChange}
            placeholder='e.g. John'
            className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Last Name</label>
          <input
            name='lastName'
            value={form.lastName}
            onChange={handleChange}
            placeholder='e.g. Doe'
            className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all'
          />
        </div>
      </div>

      <div className='grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8'>
        {/* DOB */}
        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Date of Birth</label>
          <input
            type='date'
            name='dob'
            value={form.dob}
            onChange={handleChange}
            className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-700'
          />
        </div>

        {/* GENDER */}
        <div>
          <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Identity <span className="text-gray-400 font-normal">(Optional)</span></label>
          <div className='flex gap-2 p-1 bg-gray-100 rounded-xl'>
            {['Male', 'Female'].map(g => (
              <button
                key={g}
                onClick={() => toggleOption('gender', g)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  form.gender === g
                    ? 'bg-white text-purple-700 shadow-sm border border-gray-200/50'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 MARRIED */}
      <div className='mb-10 sm:w-1/2 pr-0 sm:pr-4'>
        <label className='text-sm font-medium text-gray-700 mb-1.5 block'>Married? <span className="text-gray-400 font-normal">(Optional)</span></label>
        <div className='flex gap-2 p-1 bg-gray-100 rounded-xl'>
          {['Yes', 'No'].map(m => (
            <button
              key={m}
              onClick={() => toggleOption('married', m)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                form.married === m
                  ? 'bg-white text-purple-700 shadow-sm border border-gray-200/50'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 ACTION BUTTON */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className='w-full bg-black text-white py-3.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2'
      >
        {isSaving ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Saving Profile...
          </>
        ) : (
          "Save Changes"
        )}
      </button>

      {/* 🔥 FOOTER */}
      <div className='text-xs text-gray-400 text-center mt-6'>
        By proceeding, you agree to our <span className="text-gray-600 hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-gray-600 hover:underline cursor-pointer">Privacy Policy</span>.
      </div>
    </div>
  )
}

export default EditProfile