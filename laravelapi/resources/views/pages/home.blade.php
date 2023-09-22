@extends('layouts.app')
@section('title')
    Dashboard
@endsection
@section('mainContent')
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2><i class="fa fa-home" aria-hidden="true"></i> Dashboard</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-lg-3">
                <div class="widget style1 lazur-bg">
                    <div class="row">
                        <div class="col-4">
                            <i class="fa fa-envelope-o fa-5x"></i>
                        </div>
                        <div class="col-8 text-right">
                            <span> New messages </span>
                            <h2 class="font-bold">260</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="widget style1 navy-bg">
                    <div class="row">
                        <div class="col-4">
                            <i class="fa fa-cloud fa-5x"></i>
                        </div>
                        <div class="col-8 text-right">
                            <span> Today degrees </span>
                            <h2 class="font-bold">{{$weatheResponse}}'C</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="ibox">
                    <div class="ibox-title">
                        <div class="ibox-tools">
                            <span class="label label-success float-right"><i class="fa fa-users"></i></span>
                        </div>
                        <h5>User Count</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">{{ $userCount }}</h1>
                        <small>Total User</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="ibox">
                    <div class="ibox-title">
                        <div class="ibox-tools">
                            <span class="label label-info float-right"><i class="fa fa-comment"></i></span>
                        </div>
                        <h5>Chat</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">{{ $chatCount }}</h1>
                        <small>Total Chat</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="ibox">
                    <div class="ibox-title">
                        <div class="ibox-tools">
                            <span class="label label-danger float-right"><i class="fa fa-tasks"></i></span>
                        </div>
                        <h5>User Activity</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">{{ $logactivityCount }}</h1>
                        <small>Total Activity</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="ibox">
                    <div class="ibox-content">
                        <div>
                            <span class="float-right text-right">
                                <small><i class="fa fa-clock-o"> </i>
                                    Update on {{$formattedDateTime}} <strong>India</strong></small>
                            </span>
                            <h3 class="font-bold no-margins">
                                User And Chat revenue margin
                            </h3>
                        </div>
                        <div class="m-t-sm">
                            <div class="row">
                                <div class="col-md-12">
                                    <div>
                                        <canvas id="lineChart" height="114"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="widget-head-color-box navy-bg p-lg text-center">
                    <div class="m-b-md">
                        <h2 class="font-bold no-margins">
                            {{Auth::user()->name}} {{Auth::user()->last_name}}
                        </h2>
                        <small>Role : {{Auth::user()->user_type}}</small>
                    </div>
                    @if (!empty(\Auth::user()->avatar))
                        <img class="rounded-circle circle-border m-b-md" alt={{ Auth::user()->avatar }}
                            src="{!! \Auth::user()->avatar !== '' ? url('storage/avatar/' . \Auth::user()->avatar) : url('storage/default.png') !!}">
                    @else
                        <img class="rounded-circle circle-border m-b-md" alt="default.png" src="{!! url('storage/avatar/default.png') !!}">
                    @endif
                </div>
            </div>
            <div class="col-lg-2">
                <div class="widget red-bg p-lg text-center">
                    <div class="m-b-md">
                        <i class="fa fa-bell fa-4x"></i>
                        <h1 class="m-xs">47</h1>
                        <h3 class="font-bold no-margins">
                            Notification
                        </h3>
                        <small>We detect the error.</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
@section('styles')
    <style>
        .rounded-circle {
            height: 48px;
            width: 48px
        }
    </style>
@endsection
@section('scripts')
    <script src="{{ asset('assets/admin/js/plugins/flot/jquery.flot.js') }}"></script>
    <script src="{{ asset('assets/admin/js/plugins/chartJs/Chart.min.js') }}"></script>
    <script>
        $(document).ready(function() {
            var userList = @json($userList);
            var chatList = @json($chatList);
            var monthList = @json($monthList);
            $.plot($("#lineChart"), {
                xaxis: {
                    tickDecimals: 0
                },
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 1
                            }, {
                                opacity: 1
                            }]
                        },
                    },
                    points: {
                        width: 0.1,
                        show: false
                    },
                },
                grid: {
                    show: false,
                    borderWidth: 0
                },
                legend: {
                    show: false,
                }
            });

            var lineData = {
                labels: monthList,
                datasets: [{
                        label: "User Year Wise Dataset",
                        backgroundColor: "rgba(26,179,148,0.5)",
                        borderColor: "rgba(26,179,148,0.7)",
                        pointBackgroundColor: "rgba(26,179,148,1)",
                        pointBorderColor: "#fff",
                        data: userList
                    },
                    {
                        label: "Chat Year Wise Dataset",
                        backgroundColor: "rgba(220,220,220,0.5)",
                        borderColor: "rgba(220,220,220,1)",
                        pointBackgroundColor: "rgba(220,220,220,1)",
                        pointBorderColor: "#fff",
                        data: chatList
                    }
                ]
            };
            var lineOptions = {
                responsive: true
            };
            var ctx = document.getElementById("lineChart").getContext("2d");
            new Chart(ctx, {
                type: 'line',
                data: lineData,
                options: lineOptions
            });
        });
    </script>
@endsection
