@php
    $site_logo = \App\Models\Setting::where('code', 'site_logo')->first();
    $project_title = \App\Models\Setting::where('code', 'project_title')->first();
    $favicon_logo = \App\Models\Setting::where('code', 'favicon_logo')->first();
    $copyright = \App\Models\Setting::where('code', 'copyright')->first();
    $thankyou = \App\Models\Setting::where('code', 'thankyou')->first();
@endphp
<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <img src="{!! @$site_logo->value !== ''
                        ? url('storage/setting/' . @$site_logo->value)
                        : url('storage/setting/default.png') !!}" alt="image" class="rounded-circle" height="60px" width="60px">
                    <ul class="dropdown-menu animated fadeInLeft m-t-xs">
                        <li><a class="dropdown-item" href="{{ route('profile') }}">Profile</a></li>
                        <li class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="{{ route('logout') }}">Logout</a></li>
                    </ul>
                </div>
                <div class="logo-element">
                    <img alt="image" class="rounded-circle" height="60px" width="60px"
                        src="{!! @$site_logo->value !== ''
                            ? url('storage/setting/' . @$site_logo->value)
                            : url('storage/setting/default.png') !!}">
                </div>
            </li>
            <li class="@if (Request::segment('1') == 'home') active @endif" data-toggle="tooltip" title="Dashboard">
                <a href="{{ route('home') }}">
                    <i class="fa fa-home"></i>
                    <span class="nav-label">
                        Dashboard
                    </span>
                </a>
            </li>
            <li class="@if (Request::segment('1') == 'user') active @endif" data-toggle="tooltip" title="User">
                <a href="{{ route('user.index') }}">
                    <i class="fa fa-users"></i>
                    <span class="nav-label">
                        User
                    </span>
                </a>
            </li>
        </ul>
    </div>
</nav>
