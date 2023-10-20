<input @if ($row->required == 1) required @endif type="text" class="form-control" name="{{ $row->field }}"
  placeholder="{{ old($row->field, $options->placeholder ?? $row->getTranslatedAttribute('display_name')) }}"
  @if(isset($options->disabled)) disabled @endif
  {!! isBreadSlugAutoGenerator($options) !!} value="{{ old($row->field, $dataTypeContent->{$row->field} ?? ($options->default ?? '')) }}">
