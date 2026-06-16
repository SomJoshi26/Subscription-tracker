import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
 name: {
    type : String,
     required : [true, 'Subcription name is required'],
trim : true,
minlength: [2, 'Name should be atleast 2 characters'],
maxlength: [100 , 'Name should not be more than 10 characters']

 }, 
 price : {
type : Number,
required : true, 
Price : [0, 'Price must be greater than 0 ']

 }, 
 currency:{
    type : String,
    required : true,
    trim : true,
    uppercase : true,
    enum : ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF', 'NZD']
 }, 
 frequency : {
    type : String,
    required : true,
    enum : ['daily', 'weekly', 'monthly', 'yearly']
 }, 
 category : {
    type : String,
    required : true,
    enum : ['entertainment', 'utilities', 'health', 'education', 'other']




},

paymentMethod : {
    type : String,
    required : true,
   trim: true
},
  status : {
    type : String,
    required : true,
    enum : ['active', 'inactive', 'cancelled']
   },
   startDate : {
    type : Date,
  required : true,
  validate : {
  validator :  (startDate) => startDate >= new Date() , message : 'Start date must be in the future'
   }

},
 renewalDate : {
    type : Date,
 
  validate : {
  validator : function(renewalDate) {
    return renewalDate >= new Date();
  },
  message : 'Renewal date must be in the future'
   }
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index : true
  }
},

{timestamps : true});

subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    }
    // Auto update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'inactive';
    } 
next();
});

