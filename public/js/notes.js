const COLORS = {
  1 : 'lavender',
  2 : 'blanchedalmond',
  3 : 'lightcyan',
  4 : 'whitesmoke',
  5 : 'lightgoldenrodyellow'
};


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
  if(noteData.length > 0){
    for(let i=0; i < noteData.length; i++){
      $("#savedNotes").append(getCard(noteData[i]));
    }
  }else{
    $("#savedNotes").text('There are no Notes Available at this time.');
  }
};

const getCard =(dbNote)=>{
  let date = dbNote.modified_dt?dbNote.modified_dt:dbNote.created_dt;
  let strDt = moment(date,'YYYY-MM-DD HH:mm:ss').format("Do MMM[']YY[, ]h:mm a");
  
  $card = $("<div class='card'>");
    
  //$card.attr("style","background-color:" + COLORS.dbNote.color_id);
  $card.attr("id",dbNote.note_id);

  $cardHeader = $("<div class='card-header'>");
  $cardHeader.addClass(COLORS[dbNote.color_id]);
  $cardHeader.attr("id",dbNote.note_id);
  
  $cardHeader.append(`<a data-toggle="collapse" href="#collapse${dbNote.note_id}">${dbNote.note_title}</a>`);
  $cardHeader.append(`<span style='float:right;'>${strDt} <i class="fa fa-edit" title="Edit Note"></i><i class="fa fa-trash-alt" title="Delete Note"></i></span>`);

  $cardBody = $("<div class='card-body'>");
  //$cardBody.addClass(COLORS[dbNote.color_id]);
  $cardBody.append(dbNote.note_text);

  $collapseDiv = $("<div class='collapse'>");
  $collapseDiv.attr("id","collapse"+dbNote.note_id);
  $collapseDiv.append($cardBody);
    
  $card.append($cardHeader,$collapseDiv);
   
  return $card;
}

const validateNote =(noteData)=>{
  if(!noteData.note_title  && !noteData.note_text ){
    return false;
  }
  return true;
}

const addNote = (noteData)=>{
  $.ajax({
    url: "/NoteTaker/api/note",
    method: "POST",
    data:noteData
    }).then(function () {
      clearNote();
      displayExistingNotes();
  });
}

const editNote = (note_id, noteData)=>{
  
  $.ajax({
    url: "/NoteTaker/api/note/"+note_id,
    method: "PUT",
    data:noteData
    }).then(function () {
      clearNote();
      displayExistingNotes();
  });
}

const deleteNote = (note_id)=>{
  $.ajax({
    url: "/NoteTaker/api/note",
    method: "DELETE",
    data:{note_id:note_id}
    }).then(function () {
      displayExistingNotes();
  });
};

//Set Note to Edit
const setNoteToEdit = (note_id)=>{
  // Get Note from Database
  $.ajax({
    url: "/NoteTaker/api/note",
    method: "GET",
    data:{note_id:note_id}
    }).then(function (noteData) {
      if(noteData){
        setNote(noteData[0]);
      }
  });
};

const setNote = (noteData) =>{
  $("#note_title").val(noteData.note_title);
  $("#note_text").val(noteData.note_text);
  $("#note_id").val(noteData.note_id);

  let color_id = noteData.color_id;
  let color = COLORS[color_id];
  colorCard(color, color_id);
}

const clearNote = () => {
  $("#note_title").val("");
  $("#note_text").val("");
  $("#message").text("");
  //$("#note_id").val("");
};

const colorCard=(color, color_id)=>{
  $("#note_title").css('background-color',color);
  $("#note_text").css('background-color',color);
  $(".note-body").css('background-color',color);
  $(".note-header").css('background-color',color);

  $("#color_id").val(color_id);
}

$(document).ready(function(){
  //Get existing notes
  displayExistingNotes();

  // Event Handlers
  // Add Note
  $(document).on("click",".fa-save",function(){
    let note_id = $("#note_id").val();
    let color_id = $("#color_id").val();
    let note_title = $("#note_title").val().trim();
    let note_text = $("#note_text").val().trim();

    let noteData = {note_title:note_title, note_text:note_text, color_id:color_id};

    if(validateNote(noteData)){
      if(note_id){
        editNote(note_id, noteData);
      }else{
        addNote(noteData);
      }
    }else{
      $("#message").text("Nothing to save.");
    }

    
  });

  // Delete Note
  $(document).on("click",".fa-trash-alt",function(){
    let note_id = $(this).closest("div").attr("id");
    deleteNote(note_id);
  });

  // Edit Note
  $(document).on("click",".fa-edit",function(){
    let note_id = $(this).closest("div").attr("id");
    setNoteToEdit(note_id);
  });

  // Clear Note
  $(document).on("click",".fa-undo",function(){
    clearNote();
  });

  // Color code
  $(document).on("click",".fa-circle",function(){
    let color = $(this).attr('color');
    let color_id = $(this).attr('color_id');
    colorCard(color,color_id);
  });
});
