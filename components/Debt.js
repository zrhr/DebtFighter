

export const calculateDebt=(accounts, debtPayment)=>{
    var totalDebt=0;
    var totalminPayment = 0;
    var avalancheData;
    var snowballData;
    accounts.forEach((account)=>{
        totalminPayment += parseFloat(account.minimumPayment)
        totalDebt += parseFloat(account.balance)
    })

    debtFree = (function()
{
	/*simple function for finding simple Interest 
	* Input @prncpl  = Amount for finding interest
	*       @rate    = Rate of interest
	*		@time	 = number of year
	*/
	var SI = function (prncpl,rate,time)
			{	
							var int = Math.round((prncpl * (rate/100) * time)*100)/100;
							return  int;
			};	
	/*function for calculating debt free months
	* Input @prncpl  = debt amount
	*       @rate    = Rate of interest
	*		@time	 = number of year
	*/
	var DFTerm = function (p,r,emi)
			{
				/*formula used 
				*
				*       N =	[ Log(M) - Log(M - PR/12)]  / Log(1 + R/12)
				*      	Where N = Numbers of Months
				*		M = Monthly payment towards debt
				*		P = Prinipal
				*		R = Rate of Intrest
				*/
				var dividend 	= Math.log(emi) - Math.log(emi -(p*r/1200));
				var divisor 	= Math.log((1+(r/1200)));
				var res = 		dividend/divisor;
				return res;  
			};
	/* 	function for calculationg minimum EMi for debt
	*	@prncpl	= Debt Amount
	*	@rate 	= rate of interest 
	*/
	var DFDetails = function(amnt,rate,emi)
		{
			var prncplInEMI = 0,lonAmntToPay=0,lastEmi=0;
			var remngAmnt = amnt;
			var totalIntrst=0,debtFreeMonth = 0,totalPayment=0;
			do{
				
					debtFreeMonth += 1;
					var time = 1/12;
					var intrst = SI(amnt,rate,time);
					totalIntrst += intrst;
					if(intrst > emi) 
					{
		      			return false;
				    }
					amnt = amnt + intrst;
					amnt = amnt - emi;
					amnt = Math.round(amnt*100)/100;

					totalPayment = totalPayment + emi;

					if(amnt <= 0)
					{
						lastEmi = emi+amnt;
						totalPayment = totalPayment + amnt;
							
					} 
					
			}while(amnt > 0)
			loan_data = {
		    'total': Math.round(totalPayment),
		    'interest': totalIntrst,
		    'payments': debtFreeMonth,
		    'lastEmi' : lastEmi
  			};
			return loan_data;
		}
	var EMI = function(prncpl,rate)
			{
				/*formula used
				*	
				* 	M = (P*i)/12*100
				*	where	
		    	*	M = monthly mortgage payment
		    	*	P = the principal, 
		    	*	i = your monthly interest rate. rate will be divide by 12, for each month of the year.
			    */
			    var dividend = prncpl * rate;
				var divisor		= 1200;
				var emi = dividend / divisor;
				return Math.ceil(emi);
			};
	
            
    var  max= function(sourceArray)
		    {
		    	var max = sourceArray[0];
				var maxIndex = 0;
				for (var i = 1; i < sourceArray.length; i++) 
				{
	    			if (sourceArray[i] > max) 
	    			{
	        			maxIndex = i;
	        			max = sourceArray[i];
    				}
				}
				return {"index" : maxIndex,"value": max};
		    };
	var min = function(sourceArray)
		    {
		    		var min = sourceArray[0];
					var minIndex = 0;
					for (var i = 1; i < sourceArray.length; i++) 
					{
		    			if (sourceArray[i] < min) 
		    			{
		        			minIndex = i;
		        			min = sourceArray[i];
	    				}
					}
					return {"index" : minIndex,"value": min};
		    };
	//Function for advanced debt free on basis of substitute payment of paid debt card to another one.
	//this advanced method is based on  higher inseterest first Paid.
	var AdDFP = function(cardLists)
			{
				var smlTrmindex = cardLists[0].index;
				var completedTerm = cardLists[0].term;

				var completedEmi = 	emiArray[smlTrmindex];
				cardLists.splice(0,1);
				if(cardLists.length <= 0)
				{
					return false;
				}
				//find Highest Rate from remaining cards
				
				//find highest rate and its index for allocating money to that card.
				var ab = cardLists.reduce(function(high, arr,index) 
				{
					var maxVal = high.value >= arr.rate ? high.value : arr.rate;
					var listIndex, maxindex;
					if(typeof(high.orignlIndex) == "undefined")
					{
						maxindex =  arr.index;
						listIndex = index;
					}
					else
					{
						maxindex = high.value >= arr.rate ? high.orignlIndex : arr.index;
						listIndex = high.value >= arr.rate ? high.listIndex : index;
					}	
					return {"value":maxVal,"orignlIndex":maxindex,"listIndex":listIndex};
				},-Infinity);
				var emi = emiArray[ab.orignlIndex];
				var newEmi = emi + completedEmi;
				//var rate = rateArray[ab.orignlIndex];
				var rate = ab.value;
				data = paidPrincipal(prncplArray[ab.orignlIndex],emi,rate,completedTerm);
				var intresrt = data.interest;
				if(data)
				{
					emiArray[ab.orignlIndex] = newEmi;
					if(data.remainPrncpl > newEmi)
					{
						var newTerm = DFP(data.remainPrncpl,rate,newEmi);
						newPayment=	newTerm * newEmi;
						var newInt = newPayment - data.remainPrncpl;
						cardLists[ab.listIndex].term = Math.ceil(newTerm) + completedTerm;
					}
					else if(data.remainPrncpl <= newEmi)
					{
						var newTerm = completedTerm+1;
						cardLists[ab.listIndex].term = newTerm;
					}
				}
				else
				{
					return false;
				}	
			};
	var sortby = function ()
	{
			var fields = [],
            n_fields = arguments.length,
            field, name, reverse, cmp;

        // preprocess sorting options
        for (var i = 0; i < n_fields; i++) {
            field = arguments[i];
            if (typeof field === 'string') {
               name = field;
                cmp = default_cmp;
            }
            else {
                name = field.name;
                cmp = getCmpFunc(field.primer, field.reverse);
            }
            fields.push({
                name: name,
                cmp: cmp
            });
        }
        // final comparison function
        return function(A, B) {
            var a, b, name, result;
            for (var i = 0; i < n_fields; i++) {
                result = 0;
                field = fields[i];
                name = field.name;

                result = field.cmp(A[name], B[name]);
                if (result !== 0) break;
            }
            return result;
        }
     
	};
	var default_cmp = function(a, b) {
            if (a == b) return 0;
            return a < b ? -1 : 1;
        };
    var getCmpFunc = function(primer, reverse) {
            var dfc = default_cmp, // closer in scope
                cmp = default_cmp;
            if (primer) {
                cmp = function(a, b) {
                    return dfc(primer(a), primer(b));
                };
            }
            if (reverse) {
                return function(a, b) {
                    return -1 * cmp(a, b);
                };
            }
            return cmp;
        };
	var paidPrincipal = function (amnt,emi,rate,term)
		{
			var totalPayment=0,loan_data,totalIntrst=0,lastEmi=0;;
			while(term > 0)
			{
					var time = 1/12;
					var intrst = SI(amnt,rate,time);
					if(intrst > emi) 
					{
						return false;
				    }
					amnt = amnt + intrst;
					amnt = amnt - emi;
					amnt = Math.round(amnt*100)/100;
					totalPayment = totalPayment + emi;
					totalIntrst += intrst;

					if(amnt < 0) 
					{
						totalPayment = totalPayment + amnt;
						lastEmi = emi+amnt;
					}
					term = term- 1;
			}

			loan_data = {'remainPrncpl': Math.round(amnt),'interest': totalIntrst,'lastEmi':lastEmi };
			return loan_data;
		};
	var minPay  = function(amnt,rate)
		{
			rate = rate/100;
			var n = 1/12;
			var intst = amnt * rate * n;
			var onePercnt = amnt * 0.01;
			//var onePercnt = 0;
			minp = Math.ceil(intst + onePercnt);
			return minp;

		};
	var snowBall = function(cardLists)
		{
			var cardListSnowBall = Object.create(cardLists);
			//sort(cardListSnowBall,'amnt');
			cardListSnowBall.sort(sortby({name:'amnt',primer: parseInt}));
			payoffData = payOffLogic(cardListSnowBall);
			return payoffData;
			
		};
	var avalanche = function(cardLists)
		{
			var cardListAvalan = Object.create(cardLists);
			//sort(cardListAvalan,'rate','DESC');
			//sort(cardListAvalan,);
			cardListAvalan.sort(sortby({name:'rate',primer: parseInt,reverse: true}, {name:'amnt',primer: parseInt,reverse: true}));
			//homes.sort(sort_by('city', {name:'price', primer: parseInt, reverse: true}));
			payoffData = payOffLogic(cardListAvalan);
			return payoffData;
		};
	var payOffLogic = function(carsListObj)
		{
			var payOffIntrestArray=[],payOffTermArray=[],recoAmortizArray=[];
			while(carsListObj.length > 0)
			{
				var totalMinPaymnt = 0;
				var previousCard,lastCardEMi=0 ;
				var curntCard = carsListObj[0];
				var remaingAmnt,minPayment,curTerm,curInt,obj;
				totalMinPaymnt = 0;
				if (!recoAmortizArray[curntCard.index]) 
    				recoAmortizArray[curntCard.index] = [];
				for (var i = 0; i < carsListObj.length; i++) 
				{
					minP = minPay(carsListObj[i].amnt,carsListObj[i].rate);
					totalMinPaymnt = totalMinPaymnt + minP; 
					carsListObj[i].minPayment = minP;
				}
				carsListObj.splice(0,1);
				if(typeof(previousCard) != "undefined")
				{
					var term = Math.ceil(previousCard.term);
					var amnt = curntCard.amnt;
					var rate = curntCard.rate;
					var emi  = curntCard.minPayment; 
					var data;
					if(typeof(previousCard.surPlusEmi) != "undefined" && previousCard.surPlusEmi > 0 )
					{
						//find paid principal till last card term
						//if last card completely paid in first term than no need to calculat this part.
						if(term != 1)
						{
							data =  paidPrincipal(amnt,emi,rate,term-1);	
							amnt = data.remainPrncpl;
							curInt = data.interest;
							obj = {"balance":curntCard.amnt,"interest":Math.round(data.interest),"month":(term-1),"payment":emi};
							recoAmortizArray[curntCard.index].push(obj);
							if(data.remainPrncpl <= 0)
							{
								emi = previousCard.surPlusEmi - emi;
								previousCard.surPlusEmi = previousCard.surPlusEmi - Math.round(data.lastEmi);	
								payOffIntrestArray[curntCard.index] = Math.round(curInt);;
								payOffTermArray[curntCard.index] = Math.ceil(term-1);
								continue;
							}
						}
						//Now add surplus emi in next card.
						var tempEmi = previousCard.surPlusEmi + emi;
						data =  paidPrincipal(amnt,tempEmi,rate,1);	
						curInt += data.interest;
						obj = {"balance":amnt,"interest":Math.round(data.interest),"month":1,"payment":tempEmi};
						if(data.remainPrncpl <= 0)
						{
							previousCard.surPlusEmi = previousCard.surPlusEmi - Math.round(data.lastEmi);	
							obj = {"balance":amnt,"interest":Math.round(data.interest),"month":1,"payment":Math.round(data.lastEmi)};
							recoAmortizArray[curntCard.index].push(obj);
							payOffIntrestArray[curntCard.index] = Math.round(curInt);
							payOffTermArray[curntCard.index] = Math.ceil(term);
							continue;
						}
					}
					else
					{
						data =  paidPrincipal(amnt,emi,rate,term);	
						curInt = data.interest;
						obj = {"balance":curntCard.amnt,"interest":data.interest,"month":term,"payment":emi};
					}
					curTerm = term;
					remaingAmnt = data.remainPrncpl;
					recoAmortizArray[curntCard.index].push(obj);
					
				}
				else
				{
					remaingAmnt = curntCard.amnt;
					curTerm = 0;
					curInt=0;	
				}
				var newClubedEMi = totalEMi - (totalMinPaymnt - curntCard.minPayment);
				var newData = DFDetails(remaingAmnt,curntCard.rate,newClubedEMi);
				newTerm = newData.payments;
				newPayment=	newData.total;
				var newInt = newData.interest;
				lastCardEMi = newData.lastEmi;
				var cardInterest = Math.round(newInt+curInt);
				payOffIntrestArray[curntCard.index] = cardInterest;
				curntCard.term = curTerm + newTerm;
				payOffTermArray[curntCard.index] = Math.ceil(curntCard.term);
				previousCard = curntCard;
				if(newTerm == 1)
				{
					newClubedEMi = 	newData.lastEmi;
				}
				if(newData.lastEmi < newClubedEMi)
				{
					obj = {"balance":remaingAmnt,"interest":cardInterest,"month":(newTerm-1),"payment":newClubedEMi};
					recoAmortizArray[curntCard.index].push(obj);
					previousCard.surPlusEmi = newClubedEMi - newData.lastEmi;	
					obj = {"balance":remaingAmnt,"interest":cardInterest,"month":1,"payment":newData.lastEmi};
					recoAmortizArray[curntCard.index].push(obj);
				}
				else
				{
					obj = {"balance":remaingAmnt,"interest":cardInterest,"month":newTerm,"payment":newClubedEMi};
					recoAmortizArray[curntCard.index].push(obj);

				}
				
				
				//recoAmortizArray[curntCard.index].push(obj);
				
			}
			totalData = findTotal(payOffIntrestArray,payOffTermArray);
			totalData['recoArray'] = recoAmortizArray;
			return totalData;
		};
	
	var findTotal = function(intrestArray,termArray)
		{
			var totalIntrst=0,totalPayment=0,summaryRecoArray = [];
			for(var i=0;i<prncplArray.length;i++)
			{
				//summaryRecoArray[i] 	= [];
				totalIntrst 			+= intrestArray[i];
				var cardWisPaymnt 		=  parseFloat(prncplArray[i]) + parseFloat(intrestArray[i]);
				totalPayment 			+= cardWisPaymnt ;
				obj = {"balance":prncplArray[i],"interest":intrestArray[i],"month":termArray[i],"totalAmt":cardWisPaymnt};
				summaryRecoArray.push(obj);
			}
			var totalTerm = max(termArray);
			return {"totalIntrst":totalIntrst,"totalPayment":totalPayment,"totalTerm":totalTerm.value,"summaryArray":summaryRecoArray};
		};
		    return {
                simpleIntrst: SI,
                debtFreeTerm: DFTerm,
                debtFreeDetails:DFDetails,
                EMI: EMI,
                findMin:min,
                findMax:max,
                payOffTerm:AdDFP,
                sortby :sortby,
                snowBall:snowBall,
                minPay: minPay,
                avalanche:avalanche
            };

})();
    var prncplArray = [],emiArray=[],nameArray= [],curEMi=0;;
    var cardListObjects = [];
    var totalEMi=0,normalDebtFree=0,recoDebtFree=0,totalPayment=0,totalPrincpal=0;
    var normalAmortizArray = [];
    var emailSubmitted = false;
    var alphabetArray = ["A","B","C","D","E","F"];
    
        totalEMi=0;
        nameArray	 	= [];
        prncplArray 	= [];
        emiArray	 	= [];
        cardListObjects = [];
        amortizArray 	= [];
        termArray 		= [];
        totalPayment 	= 0,totalPrincpal=0;
        normalAmortizArray = [],snowballData=[];
        var hasError = false;
        accounts.forEach((account, i)=>{
        
		var prncpl = parseFloat(account.balance);
		
		var rate = parseFloat(account.apr)
		var emi = parseFloat(account.minimumPayment);
		if(prncpl == '' || isNaN(prncpl) )
       	{
               console.log("error prncpl")
               return false
       	}

       	if(rate == '' || isNaN(rate))
       	{
           console.log("error rate")
           return false
       	}
       	if(rate > 99)
       	{
               console.log('Please enter an apr rate less than 100.')
               return false
		}
       	var minimumEmi = debtFree.minPay(prncpl,rate);
       	if(emi == '' || isNaN(emi) || (emi < parseFloat(minimumEmi)) || (emi > prncpl))       	{
       		if(emi < parseFloat(minimumEmi))
	       	{ 
	       		console.log('Please enter amount higher than $'+minimumEmi);
	       	}
	       	else if(emi > prncpl)
	       	{
	       		console.log('Please enter amount less than card balance.')
	       	}
	       	else
	       	{
       			console.log('Please enter Minimum Monthly Payment.')
       		}
       		
       		return false;
       	}
       	var term=0;
       	prncplArray[i] 	= prncpl 	= parseFloat(prncpl);
       	emiArray[i] 	= emi 		= parseFloat(emi);
		rate 			= parseFloat(rate);

       	card 			= debtFree.debtFreeDetails(prncpl, rate, emi);
       	term			= parseFloat(card.payments);

       	var obj = {"index": i ,"term":term,"rate":rate,"amnt":prncplArray[i]};
       	cardListObjects.push(obj);
       	termArray[i]	= term;
       	totalPayment += card.total;
       	totalPrincpal += prncpl;
       	ammortobj = {"balance":prncpl,"interest":Math.round(card.interest),"month":term,"payment":emi,"totalAmt":card.total,"lastEmi":card.lastEmi};
       	/*if (!normalAmortizArray[i])
    		normalAmortizArray[i] = [];*/
    	normalAmortizArray.push(ammortobj);
    	//console.log(normalAmortizArray);
    	totalEMi += emi;


    });
	var additionlPaymnt = debtPayment;
console.log(totalEMi,"totalEmi")
console.log(additionlPaymnt, "addition")
console.log(totalPrincpal, "total Principal")
	if(additionlPaymnt != '')
	{
		
		additionlPaymnt = parseFloat(additionlPaymnt);
	}
	else
	{
		additionlPaymnt = 0;
	}
	if(additionlPaymnt >= totalEMi && additionlPaymnt <= totalPrincpal)
    {
    	totalEMi = additionlPaymnt;
    	
    }
    else if(additionlPaymnt > totalPrincpal)
    {
    	console.log('Your Monthly payment should not exceed total balance of all cards')
    	hasError = true;
    }
    else
    {
    	console.log('Amount must be greater than or equal to '+totalEMi+'.')
    	hasError = true;
    }
	curEMi = totalEMi;
	if(hasError)
	{
		return false;
	}
	else
	{
		//$("#resultDiv").removeClass('hide');
		//recoPlanContainer
		//$('.charts-captn-row, .charts-img-row, .show-dtl-btn-bx,.line_cal').css('display','block');
	}
	avalancheData = debtFree.avalanche(cardListObjects);
	snowballData = debtFree.snowBall(cardListObjects);
	
	//generateResult();
    
    return {"avalanche":avalancheData, "snowball":snowballData, "totalEMi":totalEMi, "totalDebt":totalPrincpal};
}