import React, { Component } from "react";
class AddNotes extends Component {
    render() {
        return (
            <div className="modal modal-lg-fullscreen fade" id="addNoteModal" tabIndex="-1" role="dialog" aria-labelledby="addNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addNoteModalLabel">Add new note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="addNoteName" className="col-form-label">Note title:</label>
                                    <input type="text" className="form-control" id="addNoteName" placeholder="Add note title here" name="title" onChange={this.props.handleInput} value={this.props.title} />
                                    <p className="text-danger" style={{ color: "red" }}>{this.props.title_error}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addNoteDetails" className="col-form-label">Note details:</label>
                                    <textarea className="form-control hide-scrollbar" id="addNoteDetails" rows="4"
                                        placeholder="Add note descriptions" name="description" onChange={this.props.handleInput} value={this.props.description}></textarea>
                                    <p className="text-danger" style={{ color: "red" }}>{this.props.description_error}</p>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Note tag:</label>
                                    <select className="custom-select font-size-sm shadow-none" name="status" onChange={this.props.handleInput} value={this.props.status}>
                                        <option value="Personal">Personal</option>
                                        <option value="Important">Important</option>
                                        <option value="Work">Work</option>
                                        <option value="Favourite">Favourite</option>
                                    </select>
                                    <p className="text-danger" style={{ color: "red" }}>{this.props.status_error}</p>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light border" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.props.handleAddNotes}>Add task</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNotes;