@extends('layouts.app')
@section('title')
    user Management
@endsection
@section('mainContent')
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-12">
            <h2><i class="fa fa-users" aria-hidden="true"></i> user Management</h2>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="{{ route('home') }}">Home</a>
                </li>
                <li class="breadcrumb-item active">
                    <span class="label label-success float-right all_backgroud"><strong>user Table</strong></span>
                </li>
            </ol>
        </div>
    </div>

    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox">
                    <div class="ibox-content">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                {!! $html->table(['class' => 'table table-striped table-bordered dt-responsive'], true) !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title pull-left" id="exampleModalLabel1">user Detail</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body testdata">
                    <h3>Modal Body</h3>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('styles')
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css">
@endsection
@section('scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js">
    </script>
    {!! $html->scripts() !!}
    <script type="text/javascript">
        $(document).on("click", "a.deleteuser", function(e) {
            var row = $(this);
            var id = $(this).attr('data-id');
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this record",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e69a2a",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: "{{ route('user.delete', ['']) }}" + "/" + id,
                        type: 'post',
                        data: {
                            "_token": "{{ csrf_token() }}"
                        },
                        success: function(msg) {
                            if (msg.status == 'success') {
                                swal({
                                        title: "Deleted",
                                        text: "Delete Record success",
                                        type: "success"
                                    },
                                    function() {
                                        location.reload();
                                    });
                            } else {
                                swal("Warning!", msg.message, "warning");
                            }
                        },
                        error: function() {
                            swal("Error!", 'Error in delete Record', "error");
                        }
                    });
                } else {
                    swal("Cancelled", "Your user is safe :)", "error");
                }
            });
            return false;
        })
        $(document).on("click", "a.Showuser", function(e) {
            var row = $(this);
            var id = $(this).attr('data-id');
            $.ajax({
                url: "{{ route('user.show') }}",
                type: 'get',
                data: {
                    id: id
                },
                success: function(msg) {
                    $('.testdata').html(msg);
                    $('#basicModal').modal('show');
                },
                error: function() {
                    swal("Error!", 'Error in Record Not Show', "error");
                }
            });
        });

        $(document).on("click", ".changeStatusRecord", function(e) {
            var row = $(this);
            var id = $(this).attr('data-id');
            swal({
                title: "Are you sure?",
                text: "You want's to update this record status ",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e69a2a",
                confirmButtonText: "Yes, updated it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: "{{ route('user.change_status', 'replaceid') }}",
                        type: 'post',
                        data: {
                            "_method": 'post',
                            'id': id,
                            "_token": "{{ csrf_token() }}"
                        },
                        success: function(msg) {
                            if (msg.status == 'success') {
                                swal({
                                        title: "Status",
                                        text: "Status Record success",
                                        type: "success"
                                    },
                                    function() {
                                        location.reload();
                                    });
                            } else {
                                swal("Warning!", msg.message, "warning");
                            }
                        },
                        error: function() {
                            swal("Error!", 'Error in updated Record', "error");
                        }
                    });
                    //swal("Updated!", "Status has been updated.", "success");

                } else {
                    swal("Cancelled", "Your user Status is safe :)", "error");
                }
            });
            return false;
        })
        $(document).on('click', '.mobile_number-eye', function() {
            const userId = $(this).data('id');
            const mobileNumberInput = $('#mobile_number' + userId);
            const mobileNumberEyeIcon = $(this).find('.mobile_number-eye-icon');

            if (mobileNumberInput.attr('type') === 'password') {
                mobileNumberInput.attr('type', 'text');
                mobileNumberEyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                mobileNumberInput.attr('type', 'password');
                mobileNumberEyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
            }
        });
    </script>
@endsection
