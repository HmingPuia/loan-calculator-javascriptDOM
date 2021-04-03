//LISTER FOR SUMMIT
document.getElementById('loan-form').addEventListener('submit', function(e){
    //HIDE RESULT
    document.getElementById('results').style.display='none';
    //SHOW LOADER
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults,2000)
    e.preventDefault();
})

function calculateResults(e){
    
    console.log('Calculating.....');
    //UI VARIABLES
    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    const montlyPayment=document.getElementById('monthly-payment');
    const totalPayment=document.getElementById('total-payment');
    const totalInterest=document.getElementById('total-interest');

    const principal=parseFloat(amount.value);
    const calculatedInterest=parseFloat(interest.value) / 100 /12;
    const calculatedPayments=parseFloat(years.value) * 12;
    //COMPUTE MONTHLY PAYMENT
    const x=Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly= (principal *x*calculatedInterest)/(x-1);
    if(isFinite(monthly)){
        montlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly * calculatedPayments).toFixed(2);
        totalInterest.value=((monthly * calculatedPayments)-principal).toFixed(2)
        //show result
        document.getElementById('results').style.display='block';
        //Hide result
        document.getElementById('loading').style.display='none';
    }else{
        showError('Please check your number')
    }

}
//SHOW ERROR
function showError(error){
    //HIDE RESULT
    document.getElementById('results').style.display='none';
    //SHOW LOADER
    document.getElementById('loading').style.display='none';
    //CREATE A DIV
    const errorDiv=document.createElement('div');

    //GET ELEMENTS
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');


    //ADD CLASS
    errorDiv.className='alert alert-danger'

    //CREATE TEXT NODE AND APPEND TO DIV
    errorDiv.appendChild(document.createTextNode(error))

    //Insert header above heading
    card.insertBefore(errorDiv,heading);
    //clear eror adfter 3 sec
    setTimeout(clearError,3000);
}
function clearError(){
    document.querySelector('.alert').remove();
}

