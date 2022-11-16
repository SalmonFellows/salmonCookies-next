import styles from '../styles/Home.module.css';

function Form(){

  const handleSubmit = (event)=>{
    event.preventDefault()

const data ={
  location:event.target.loc.value,
  minimum: event.target.min.value,
  maximum: event.target.max.value,
  average: event.target.avg.value,
}
 }
  return (
<form className = {styles.form} onSubmit={handleSubmit} action="/send-data-here" method="post">
  <label for="first">Location:</label>
  <input type="text" id="location" name="loc" />
  <label for="first">Minimum Customers:</label>
  <input type="text" id="minimum customers" name="min" />
  <label for="last">Maximum Customers:</label>
  <input type="text" id="maximum customers" name="max" />
  <label for="last">Average Cookies Sold:</label>
  <input type="text" id="avg" name="avg" />
  <button type="submit">Add Location</button>
</form>
    
  )
}


export default Form;