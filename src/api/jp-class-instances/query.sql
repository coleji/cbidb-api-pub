select i.instance_id, t.type_name,
to_char(s.session_datetime, 'MM/DD/YYYY') as start_date,
to_char(s.session_datetime, 'HH:MIPM') as start_time,
l.location_name,
ins.name_first as instructor_name_first,
ins.name_last as instructor_name_last,
(select count(*) from jp_class_signups where instance_id = i.instance_id and signup_type = 'E') as enrollees
from jp_class_types t, jp_class_instances i, jp_class_sessions s,
class_locations l, class_instructors ins
where i.instance_id = s.instance_id
and i.type_id = t.type_id
and i.location_id = l.location_id (+)
and i.instructor_id = ins.instructor_id (+)
and trunc(s.session_datetime) = to_date(':startDate', 'MM/DD/YYYY')
order by s.session_datetime, t.display_order, i.instance_id
