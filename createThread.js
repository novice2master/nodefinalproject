function addThread(heading, collapse, comments, object) {
    var threadlist = document.getElementById('generalThreads');
    threadlist.innerHTML += `
        <div class="card border-0" >
            <div class="card-header threadCardHeader" id=${heading} data-toggle="collapse" data-target=${'#' + collapse}>
                <h5 class="mb-0">
                    <button class="btn btn-link" type="button"  aria-expanded="true" aria-controls=${collapse}>
                        ${object.Title}
                    </button>
                </h5>
            </div>

            <div id=${collapse} class="collapse" aria-labelledby=${heading} data-parent="#generalThreads">


                <div class="card-body">
                    ${object.Email}
                    <br>
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