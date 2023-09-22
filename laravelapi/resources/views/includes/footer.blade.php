@php 
$site_logo = \App\Models\Setting::where('code','site_logo')->first();
$project_title = \App\Models\Setting::where('code','project_title')->first();
$favicon_logo = \App\Models\Setting::where('code','favicon_logo')->first();
$copyright = \App\Models\Setting::where('code','copyright')->first();
$thankyou = \App\Models\Setting::where('code','thankyou')->first();
@endphp
<div class="footer">
    <div>
        <strong>Copyright</strong> {{$copyright->value}} &copy; {{ date('Y') }}
    </div>
</div>
