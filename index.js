var bdyDate = document.querySelector("#bdy-input")
var checkPalindromeBtn = document.querySelector("#check-palindrome")
var result = document.querySelector("#result")
var palindromeGif = document.querySelector("#palindrome-gif")


function dateFormats(date)
{
    if(date.day<10)
    {
        date.day="0"+date.day;
    }
    else
    {
        date.day = date.day.toString()

    }
    if(date.month<10)
    {
        date.month="0"+date.month
    }
    else
    {
        date.month = date.month.toString();
    }
    date.year = date.year.toString()
    
    var ddmmyyyy=date.day + date.month + date.year
    var mmddyyyy = date.month + date.day + date.year
    var yyyymmdd = date.year + date.month + date.day
    var ddmmyy = date.day + date.month + date.year.slice(-2)
    var mmddyy = date.month + date.day+ date.year.slice(-2) //negitive start position takes end of array
    var yyddmm = date.year.slice(-2) + date.day + date.month

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yyddmm]


}

function reverseStringDate(dateStr)
{
    
    var splitDate = dateStr.split("")
    splitDateReverse = splitDate.reverse()
    var joinedDate = splitDateReverse.join("")
 
    return joinedDate

}

function checkPalindromeInAllFormats(date)
{
    var dateFormatList = dateFormats(date);
   
    var palindromeList = []

    for(var i=0; i<=dateFormatList.length-1; i++)
    {
        if(reverseStringDate(dateFormatList[i]) === dateFormatList[i])
        {
            
            palindromeList.push(reverseStringDate(dateFormatList[i]) === dateFormatList[i])
        }
        else
        {
            palindromeList.push(reverseStringDate(dateFormatList[i]) === dateFormatList[i])

        }


    }
    return palindromeList;


}

function isLeapYear(year)
{
    if(year%400 === 0)
    {
        return true;
    }
    if(year%100 === 0)
    {
        return false;
    }
    if(year%4 === 0)
    {
        return true;
    }
    return false;

}

function getNextDate(date)
{
    var day = Number(date.day) + 1;
    var month = Number(date.month);
    var year = Number(date.year);

    console.log(day, month, year)

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2)
    {
        if(isLeapYear(year))
        {
            if(day > 29)
            {
                day = 1;
                month = 3; 
            }

        }
        else
        {
            if(day > 28)
            {
                day = 1;
                month = 3
            }
        }

    }
    else
    {

        if(day > daysInMonth[month-1])
        {
            day=1;
            month=month+1
        }

    }

    if(month > 12)
    {
        day=1;
        month=1;
        year=year+1;
    }

    return{
        day:day,
        month:month,
        year:year

    }
}

function getNextPalindromeDate(date)
{
    var nextDate = getNextDate(date)
    var noOfNextDays = 0
    while(1)
    {
        noOfNextDays++
        var palindromeCheckList = checkPalindromeInAllFormats(nextDate);
        for(var i=0; i<=palindromeCheckList.length-1; i++)
        {
            if(palindromeCheckList[i])
            {
                return [nextDate,noOfNextDays];

            }
        }
    

       nextDate = getNextDate(nextDate);


    }
}

function getPreviousDate(date)
{
    var day = Number(date.day)-1;
    var month = Number(date.month);
    var year = Number(date.year);
    
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if(day===0)
    {
        month--;

        if(month===0)
        {
            day=31;
            month=12;
            year--;

        }
        else if(month===2)
        {
            if(isLeapYear(year))
            {
                day=29;
                
            }
            else
            {
                day=28
            }

        }
        else
        {
            day=daysInMonth[month-1]
            

        }

    }

    return {
        day:day,
        month:month,
        year:year
    }


}



function getPreviousPalindromeDate(date)
{
    var previousDate = getPreviousDate(date)
    var ctr1 = 0
    while(1)
    {
        ctr1++
        var palindromeCheckList1 = checkPalindromeInAllFormats(previousDate)
        for(var i=0; i<palindromeCheckList1.length-1; i++)
        {
            if(palindromeCheckList1[i])
            {
                console.log(palindromeCheckList1, previousDate)
                return [previousDate, ctr1]
            }
        }
        previousDate = getPreviousDate(previousDate)
    }
}

function checkPalindrome()
{
    var bdyDateValue = bdyDate.value;
    if(bdyDateValue != "")
    {
        var date = bdyDateValue.split("-")
        var yyyy = date[0];
        var mm =  date[1];
        var dd =  date[2];
    }

    var date = 
    {
        day:Number(dd),
        month:Number(mm),
        year:Number(yyyy)

    }
    

    var palindromeCheckList = checkPalindromeInAllFormats(date);
    var isPalindrome = false;

    for(var i=0; i<palindromeCheckList.length; i++)
    {
        if(palindromeCheckList[i] === true)
        {
            isPalindrome = true; 

            result.innerText = "Yahoo! Your Birthday Is Palinfrome"
            palindromeGif.style.display = "block";

            break;
        }
    }
    
    if(!isPalindrome)
    {
        palindromeGif.style.display = "none";
        var [nextDate, ctr] = getNextPalindromeDate(date)
        var [previousDate, ctr1] = getPreviousPalindromeDate(date)
        console.log(nextDate, ctr, previousDate, ctr1)
        if(ctr < ctr1)
        {
            result.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed it by just ${ctr} days `
        }
        else
        {
            result.innerText = `The naerest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, You missed it by just ${ctr1} days `

        }
       
        
    }

}





checkPalindromeBtn.addEventListener("click", checkPalindrome)





























