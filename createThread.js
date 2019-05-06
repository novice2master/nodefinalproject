/*
var request = new XMLHttpRequest();
request.open("GET", "threads.json", false);
request.send(null);
var obj = JSON.parse(request.responseText);
*/
//const utils = require('./utils');




<!--addThread(obj[i].Category + String(i), "collapse" + obj[i].Category + String(i), "comments go here", obj[i]);-->
<!--{{Category}}{{@Index}}     'collapse{{Category}}{{@Index}}'         {{Comments}}-->



function fillThreades(objects, category) {

    for (i in obj) {
        if (obj[i].Category === category) {
            addThread(obj[i].Category + String(i), "collapse" + obj[i].Category + String(i), "comments go here", obj[i]);

        }
    }
}

/*
function fillThreadesAll() {

    var db = getDb();
    db.collection('threads').find({}).toArray(function (err, obj) {
        if (err) {
            console.log(err);
            // response.send('Unable to retrieve posts');
        } else {
            // response.send(threads);
            console.log(obj);

            for (i in obj) {
                addThread(obj[i].Category + String(i), "collapse" + obj[i].Category + String(i), "comments go here", obj[i]);
            }
        }
    });
}
*/
function addThread(heading, collapse, comments, object) {
    console.log('worked');
    var threadlist = document.getElementById('generalThreads');
    threadlist.innerHTML += `
        <div class="card border-0" >
            <div class="card-header threadCardHeader" id=${heading} data-toggle="collapse" data-target=${'#' + collapse}>
                <h5 class="mb-0">
                    <button class="btn btn-link" type="button"  aria-expanded="true" aria-controls=${collapse}>
                        ${object.Title}
                        <small>&lt${object.Email}&gt</small>
                    </button>
                </h5>
            </div>

            <div id=${collapse} class="collapse" aria-labelledby=${heading} data-parent="#generalThreads">
                <div class="card-body">
                    ${object.Message}
                    <div class="row commentTopMargin">
                        <div class="col-md-4">&nbsp;</div>
                        <div class="accordion col-md-8" id=${heading + 'accordion'} data-toggle="collapse" data-target=${'#' + comments}>
                            <div class="card border-0">
                               <div class="card-header">
                                   <h5 class="mb-0">
                                        <button class="btn btn-link" type="button">
                                            Comments
                                        </button>
                                   </h5>
                                </div>
                                <div id=${comments} class="collapse" data-parent=${'#' + heading + 'accordion'}>
                                    <div class="card-body">
                                        Comments go here
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>`;
}
