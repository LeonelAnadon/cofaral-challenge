

const formatDate = (date) => {

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  let newDate = new Date(date).toLocaleDateString('en-US', options)
  let upperCaseDate = newDate.charAt(0).toUpperCase()+newDate.slice(1)
  let dateWithTime = `${upperCaseDate} ${new Date(date).toLocaleTimeString('en-US')}`

  return dateWithTime
}

export default formatDate