using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

public partial class _Default : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["carousel_v1"].ConnectionString);
    const string SP_SelectGame = "SelectGame";
    const string Sort_CreatedDate_Desc = "CreatedDate DESC";

    protected void Page_Load(object sender, EventArgs e)
    {
        using (con)
        {
            using (SqlCommand cmd = new SqlCommand(SP_SelectGame, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();

                DataTable dt = new DataTable();
                dt.Load(cmd.ExecuteReader());

                if(dt.Rows.Count > 0)
                {
                    Repeater1.DataSource = dt;
                    Repeater1.DataBind();
                    
                    DataView dv = dt.DefaultView;
                    dv.Sort = Sort_CreatedDate_Desc;
                    DataTable sortedDT = dv.ToTable();

                    Repeater2.DataSource = sortedDT;
                    Repeater2.DataBind();
                }

                con.Close();
            }
        }
    }
}