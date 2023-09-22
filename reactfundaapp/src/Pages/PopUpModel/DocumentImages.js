import React, { Component } from "react";
class DocumentImages extends Component {
    render() {
        return (
            <div class="modal modal-lg-fullscreen fade show" id="addTaskModal" tabindex="-1" role="dialog" aria-labelledby="addTaskModalLabel" aria-modal="true" style={{ display: "block" }}>
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src={this.props.documentPhoto} alt={'modelpopupFile'} style={{ height: '320px', width: '-webkit-fill-available' }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocumentImages;