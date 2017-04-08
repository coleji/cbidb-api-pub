select i.instance_id, t.type_name, to_char(fs.session_datetime, 'MM/DD/YYYY') as start_date, to_char(fs.session_datetime, 'HH:MIPM') as start_time,
(select count(*) from ap_class_signups where instance_id = i.instance_id and signup_type = 'E') as enrollees
from ap_class_types t, ap_class_formats f, ap_class_instances i, ap_class_bookends bk, ap_class_sessions fs
where i.instance_id = bk.instance_id and bk.first_session = fs.session_id
and i.format_id = f.format_id and f.type_id = t.type_id
and trunc(fs.session_datetime) >= trunc(sysdate)
order by fs.session_datetime
