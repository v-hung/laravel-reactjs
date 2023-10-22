<textarea class="form-control richTextBox" name="{{ $row->field }}" id="richtext{{ $row->field }}">
  {{ old($row->field, $dataTypeContent->{$row->field} ?? '') }}
</textarea>

{{-- @push('head')
  <link rel="stylesheet" href="{{asset('asset/css/prism.css')}}">
  <script src="{{asset('asset/css/prism.js')}}"></script>
@endpush --}}

@push('javascript')
  <script>
    $(document).ready(function() {
      var additionalConfig = {
        selector: 'textarea.richTextBox[name="{{ $row->field }}"]',
      }

      $.extend(additionalConfig, {!! json_encode($options->tinymceOptions ?? (object) []) !!})

      const oldConfig = window.voyagerTinyMCE.getConfig(additionalConfig)

      const config = {
        ...oldConfig,
        codesample_global_prismjs: true,
        base_url: '{{url('/asset/js/tinymce')}}',
        plugins: oldConfig.plugins + ' codesample',
        toolbar: oldConfig.toolbar + `| codesample`,
        entity_encoding: 'raw',
        verify_html: false,
        height: 300,
        min_height: 300,
      }

      tinymce.init(config);
    });
  </script>
@endpush
