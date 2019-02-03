const displayExistingNotes = () =>{
  $.ajax({
    url: "/NoteTaker/api/getNotes",
    method: "GET"
    }).then(function (data) {
      if(data){
        displayNotes(data);
      }
  });
};

const displayNotes = (noteData) => {
  $("#savedNotes").empty();
  for(let i=0; i < noteData.length; i++){
    $("#savedNotes").append(getCard(noteData[i]));
  }
};

const getCard =(dbNote)=>{
  let strDt = moment(dbNote.created_dt,'YYYY-MM-DD HH:mm:ss').format("Do MMM[']YY[, ]HH:mm a");

  $card = $("<div class='card'>");
  $card.attr("id",dbNote.note_id);

  $cardHeader = $("<div class='card-header'>");
  $cardHeader.attr("id",dbNote.note_id);
  $cardHeader.html(`<a data-toggle="collapse" href="#collapse${dbNote.note_id}">${dbNote.note_title}</a><span style='float:right;'>${strDt}</span>`);

  

  $cardBody = $("<div class='card-body'>");
  $cardBody.append(dbNote.note_text);

  $collapseDiv = $("<div class='collapse'>");
  $collapseDiv.attr("id","collapse"+dbNote.note_id);
  $collapseDiv.append($cardBody);
    
  $card.append($cardHeader,$collapseDiv);
   
  return $card;
}

const addNote = ()=>{
  let noteData={note_title:$("#note_title").val().trim(),note_text:$("#note_text").val().trim()};
  $.ajax({
    url: "/NoteTaker/api/note",
    method: "POST",
    data:noteData
    }).then(function () {
      console.log("Note Created");
      displayExistingNotes();
  });
}

$(document).ready(function(){
//Get existing notes
displayExistingNotes();
// Event Handlers
$(document).on("click",".fa-save",function(){
  addNote();
})
});
