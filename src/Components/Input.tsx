import React from 'react'

interface Props {
    errors: Map<string, string>
    name: string
    value: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    errorPosition: 'top' | 'bottom'
}

const Input = (props: Props) => {
  const {
    errors, name, value, placeholder, onChange, errorPosition,
  } = props
  const error = errors.get(name) ?? ''
  return (
    <div style={{ display: 'inline-block' }}>
      {error && errorPosition === 'top' && error.length > 0 && (<div className="error-message">{error}</div>) }
      <input className={error?.length > 0 ? 'error' : ''} value={value} name={name} onChange={(e) => onChange(e)} placeholder={placeholder} />
      {error && errorPosition === 'bottom' && error.length > 0 && (<div className="error-message">{error}</div>) }
    </div>
  )
}

export default Input
