import { useMemo, useState } from 'react'
import PlantPreview3D from './PlantPreview3D'

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

const DAYS = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'))

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 100 }, (_, index) => String(currentYear - index))

function calcAge(dateString) {
  if (!dateString) return 0
  const birthDate = new Date(dateString)
  if (Number.isNaN(birthDate.getTime())) return 0

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDelta = today.getMonth() - birthDate.getMonth()
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }
  return age
}

function AgeGate({ onVerified }) {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dob = useMemo(() => {
    if (!year || !month || !day) return ''
    return `${year}-${month}-${day}`
  }, [year, month, day])

  const age = useMemo(() => calcAge(dob), [dob])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!year || !month || !day) {
      setErrorMessage('Please enter your date of birth.')
      return
    }

    const parsedDate = new Date(dob)
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== dob) {
      setErrorMessage('Please enter a valid date of birth.')
      return
    }

    if (age < 21) {
      setErrorMessage('You must be 21 years or older to enter this site.')
      return
    }

    if (!isConfirmed) {
      setErrorMessage('Please confirm that you are 21 or older.')
      return
    }

    setErrorMessage('')
    onVerified()
  }

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-heading">
      <div className="age-gate__panel">
        <section className="age-gate__form-wrap">
          <p className="eyebrow">Age Verification</p>
          <h2 id="age-gate-heading">Enter if you are 21 or older</h2>
          <p>
            This website is intended only for adults age 21 and older. Please
            verify your age before continuing.
          </p>

          <form className="age-gate__form" onSubmit={handleSubmit}>
            <label>Date of birth</label>
            <div className="age-gate__dob-grid" role="group" aria-label="Date of birth fields">
              <select value={month} onChange={(event) => setMonth(event.target.value)} required>
                <option value="">Month</option>
                {MONTHS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <select value={day} onChange={(event) => setDay(event.target.value)} required>
                <option value="">Day</option>
                {DAYS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>

              <select value={year} onChange={(event) => setYear(event.target.value)} required>
                <option value="">Year</option>
                {YEARS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <label className="age-gate__checkbox">
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={(event) => setIsConfirmed(event.target.checked)}
              />
              <span>I confirm I am at least 21 years old.</span>
            </label>

            {errorMessage && <p className="age-gate__error">{errorMessage}</p>}

            <div className="age-gate__actions">
              <button type="submit">Enter Site</button>
              <a href="https://www.google.com" rel="noreferrer" target="_blank">
                Exit
              </a>
            </div>
            <p className="age-gate__fine-print">
              By entering, you acknowledge local laws may vary and are
              responsible for compliance in your jurisdiction.
            </p>
          </form>
        </section>

        <section className="age-gate__model-wrap" aria-label="3D cannabis plant preview">
          <PlantPreview3D />
          <p className="age-gate__model-caption">3D preview of cannabis plant model</p>
        </section>
      </div>
    </div>
  )
}

export default AgeGate
