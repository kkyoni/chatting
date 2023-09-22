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
    <div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-lg-3">
            <div class="ibox">
                <div class="ibox-title">
                    <div class="ibox-tools">
                        <span class="label label-success float-right"><i class="fa fa-users"></i></span>
                    </div>
                    <h5>User Count</h5>
                </div>
                <div class="ibox-content">
                    <h1 class="no-margins">{{$userCount}}</h1>
                    <small>Total User</small>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="ibox">
                <div class="ibox-title">
                    <div class="ibox-tools">
                        <span class="label label-info float-right"><i class="fa fa-comment"></i></span>
                    </div>
                    <h5>Chat</h5>
                </div>
                <div class="ibox-content">
                    <h1 class="no-margins">{{$chatCount}}</h1>
                    <small>Total Chat</small>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="ibox">
                <div class="ibox-title">
                    <div class="ibox-tools">
                        <span class="label label-danger float-right"><i class="fa fa-tasks"></i></span>
                    </div>
                    <h5>User Activity</h5>
                </div>
                <div class="ibox-content">
                    <h1 class="no-margins">{{$logactivityCount}}</h1>
                    <small>Total Activity</small>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">
                    <div>
                        <span class="float-right text-right">
                            <small><i class="fa fa-clock-o"> </i>
                                Update on 16.07.2015 <strong>India</strong></small>
                        </span>
                        <h3 class="font-bold no-margins">
                            Half-year User And Chat revenue margin
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
    </div>
</div>
@endsection
@section('styles')
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
                        label: "Example dataset",
                        backgroundColor: "rgba(26,179,148,0.5)",
                        borderColor: "rgba(26,179,148,0.7)",
                        pointBackgroundColor: "rgba(26,179,148,1)",
                        pointBorderColor: "#fff",
                        data: userList
                    },
                    {
                        label: "Example dataset",
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
