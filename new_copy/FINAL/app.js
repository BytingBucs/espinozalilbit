var main = function () {

     "use strict";

     var url = "http://jimbarrell.com/fsw/getJSON.php?table=Issues";

     var $issueRows=$("");

     $.getJSON(url, function (Issues) {
           Issues.forEach(function (issue) {
             $issueRows+="<tr><td>"+
             issue.ID+"</td><td>" +
			 issue.Title+"</td><td>" +
			 issue.OpenedBy+"</td><td>" +			 
			 issue.AssignedTo+"</td><td>" +			 
			 issue.OpenedDate+"</td><td>" +			 
			 issue.DueDate+"</td><td>" +			 
			 issue.category+"</td><td>" +
			 
			 issue.Priority+"</td><td>" +

             issue.Description+"</td><td>" +           

             issue.RelatedIssue+"</td><td>&nbsp;</tr></td>";

             

           });

           $("#tblIssues tbody").append($issueRows);

     });

 

    

    

     url = "http://jimbarrell.com/fsw/getJSON.php?table=Contacts";

     var $rows=$("");

     $.getJSON(url, function (Contacts) {

          

           Contacts.forEach(function (contact) {

             $rows+="<tr><td>"+

             contact.ID+"</td><td>" +

             contact.FirstName+"</td><td>" +
			 
			 contact.LastName+"</td><td>" +
			 
			 contact.Company+"</td><td>" +
			 
			 contact.JobTitle+"</td><td>" +
			 
			 contact.EmailAddress+"</td><td>" +

             contact.BusinessPhone+"</td><td>&nbsp;</tr></td>";

            

           });

           $("#tblContacts tbody").append($rows);

     });

    

 

};

 

$(document).ready(main);