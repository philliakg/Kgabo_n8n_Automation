import { useState } from 'react'
import './App.css'

function App() {

  const [studentName, setStudentName] = useState('')
  const [email, setEmail] = useState('')
  const [courseName, setCourseName] = useState('')
  const [rating, setRating] = useState('')
  const [feedback, setFeedback] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [courseError, setCourseError] = useState('')
  const [ratingError, setRatingError] = useState('')
  const [feedbackError, setFeedbackError] = useState('')

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNameChange = (e) => {
    setStudentName(e.target.value)
    setNameError('')
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handleCourseChange = (e) => {
    setCourseName(e.target.value)
    setCourseError('')
  }

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value)
    setFeedbackError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    var isValid = true

    if (studentName === '') {
      setNameError('Please enter your name')
      isValid = false
    } else if (studentName.length < 2) {
      setNameError('Name is too short')
      isValid = false
    } else {
      setNameError('')
    }

    if (email === '') {
      setEmailError('Please enter your email')
      isValid = false
    } else if (email.includes('@') === false || email.includes('.') === false) {
      setEmailError('Please enter a valid email')
      isValid = false
    } else {
      setEmailError('')
    }

    if (courseName === '') {
      setCourseError('Please select a course')
      isValid = false
    } else {
      setCourseError('')
    }

    if (rating === '') {
      setRatingError('Please choose a rating')
      isValid = false
    } else if (rating < 1 || rating > 5) {
      setRatingError('Rating must be between 1 and 5')
      isValid = false
    } else {
      setRatingError('')
    }

    if (feedback === '') {
      setFeedbackError('Please write some feedback')
      isValid = false
    } else if (feedback.length < 10) {
      setFeedbackError('Feedback must be at least 10 characters')
      isValid = false
    } else {
      setFeedbackError('')
    }

    if (isValid === false) {
      return
    }

    setLoading(true)

    try {
     
    const response = await fetch("http://localhost:5678/webhook-test/student-feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: studentName,
          email: email,
          courseName: courseName,
          rating: rating,
          feedback: feedback,
        }),
      })

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        setSuccessMessage(data.message)
        
        setStudentName('')
        setEmail('')
        setCourseName('')
        setRating('')
        setFeedback('')
      } else {
        setErrorMessage('Error: ' + data.message)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage('Something went wrong. Please try again later.')
    }

    setLoading(false)
  }

  return (
    <div className="page">
      <div className="card">
        <h1 style={{ color: '#2c3e50', marginBottom: '5px' }}>Student Feedback</h1>
        <p style={{ color: 'gray', marginTop: '0px' }}>
          We would love to hear what you think about your course!
        </p>

        {successMessage !== '' && (
          <div className="success-box">{successMessage}</div>
        )}

        {errorMessage !== '' && (
          <div className="error-box">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={studentName}
              onChange={handleNameChange}
              style={nameError !== '' ? { border: '1px solid red' } : {}}
            />
            {nameError !== '' && <p className="error-text">{nameError}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              style={emailError !== '' ? { border: '1px solid red' } : {}}
            />
            {emailError !== '' && <p className="error-text">{emailError}</p>}
          </div>

          {/* Course */}
          <div className="form-group">
            <label>Course Name</label>
            <select
              value={courseName}
              onChange={handleCourseChange}
              style={courseError !== '' ? { border: '1px solid red' } : {}}
            >
              <option value="">-- Select your course --</option>
              <option value="Web Development">Web Development</option>
              <option value="React Fundamentals">React Fundamentals</option>
              <option value="n8n Automation">n8n Automation</option>
              <option value="Python for Beginners">Python for Beginners</option>
              <option value="Data Analytics">Data Analytics</option>
            </select>
            {courseError !== '' && <p className="error-text">{courseError}</p>}
          </div>

          {/* Rating */}
          <div className="form-group">
            <label>Rating (1 - 5)</label>
            <div className="rating-buttons">
              <button
                type="button"
                onClick={() => { setRating('1'); setRatingError('') }}
                style={{
                  backgroundColor: rating === '1' ? '#3498db' : 'white',
                  color: rating === '1' ? 'white' : '#333',
                }}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => { setRating('2'); setRatingError('') }}
                style={{
                  backgroundColor: rating === '2' ? '#3498db' : 'white',
                  color: rating === '2' ? 'white' : '#333',
                }}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => { setRating('3'); setRatingError('') }}
                style={{
                  backgroundColor: rating === '3' ? '#3498db' : 'white',
                  color: rating === '3' ? 'white' : '#333',
                }}
              >
                3
              </button>
              <button
                type="button"
                onClick={() => { setRating('4'); setRatingError('') }}
                style={{
                  backgroundColor: rating === '4' ? '#3498db' : 'white',
                  color: rating === '4' ? 'white' : '#333',
                }}
              >
                4
              </button>
              <button
                type="button"
                onClick={() => { setRating('5'); setRatingError('') }}
                style={{
                  backgroundColor: rating === '5' ? '#3498db' : 'white',
                  color: rating === '5' ? 'white' : '#333',
                }}
              >
                5
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#999', margin: '4px 0 0 0' }}>
              1 = Very poor, 5 = Excellent
            </p>
            {ratingError !== '' && <p className="error-text">{ratingError}</p>}
          </div>
      
          <div className="form-group">
            <label>Feedback Message</label>
            <textarea
              rows="5"
              placeholder="Tell us what you liked or what we can improve..."
              value={feedback}
              onChange={handleFeedbackChange}
              style={feedbackError !== '' ? { border: '1px solid red' } : {}}
            ></textarea>
            {feedbackError !== '' && <p className="error-text">{feedbackError}</p>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App