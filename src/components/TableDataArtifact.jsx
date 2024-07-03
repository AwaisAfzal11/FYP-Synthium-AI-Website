import { useState } from 'react';
import { Card, Typography, Chip } from "@material-tailwind/react";
import { FiDownload } from "react-icons/fi";
import { download_synthetic_data } from '../utils/backend_api'; 
import { DNA } from 'react-loader-spinner'



function TableDataArtifact({ table_data }) {
    const TABLE_HEAD = ["Name", "Status", "Rows", "Created on", "Download"];
    const [downloadLoader, setDownloadLoader] = useState(null);

    const handleDownload = async (synthetic_data_artifact_id) => {
        setDownloadLoader(synthetic_data_artifact_id);
        const accessToken = sessionStorage.getItem('access_token');
        try {
            const response = await download_synthetic_data(accessToken, synthetic_data_artifact_id);
            
            const url = window.URL.createObjectURL(new Blob([response.data], {type: "text/csv"}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', synthetic_data_artifact_id);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            // setError(err.message);
            console.log(err.message);
        }
        setDownloadLoader(null);
    };

    function formatDateTime(dateString) {
        // Parse the input date string
        const date = new Date(dateString);
      
        // Options for date and time formatting
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC'  // Specify UTC time zone
        };
      
        // Format the date in UTC
        const formattedUTC = new Intl.DateTimeFormat('en-US', options).format(date);
      
        // Get the local time offset in minutes
        const offsetMinutes = date.getTimezoneOffset();
      
        // Adjust the date for the local time zone
        date.setMinutes(date.getMinutes() - offsetMinutes);
      
        // Format the adjusted date in the local time zone
        options.timeZone = undefined;  // Use the local time zone
        const formattedLocal = new Intl.DateTimeFormat('en-US', options).format(date);
      
        return formattedLocal;
    }

    return (
        <Card className="h-full w-full overflow-x-auto mt-5 rounded-lg hover:shadow-[15px_0_20px_-5px_#a855f7,_-15px_0_20px_-5px_#d900ff] cursor-pointer">
            <table className="w-full min-w-max table-auto text-left bg-black text-white ">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    t
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table_data && table_data.map((synthetic_data_artifact, index) => {
                        const isLast = index === table_data.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={synthetic_data_artifact.synthetic_data_artifact_id}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal truncate"
                                    >
                                        {synthetic_data_artifact.synthetic_data_artifact_id + synthetic_data_artifact.file_extension}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Chip
                                        size="sm"
                                        // variant="ghost"
                                        value="Completed"
                                        color="green"
                                    />
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {synthetic_data_artifact.num_rows}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {formatDateTime(synthetic_data_artifact.created_on)}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        as="a"
                                        href="#"
                                        onClick={() => handleDownload(synthetic_data_artifact.synthetic_data_artifact_id)}
                                        variant="small"
                                        color="blue-gray"
                                        className="text-[20px] font-bold flex justify-center"
                                    >
                                        {downloadLoader === synthetic_data_artifact.synthetic_data_artifact_id ? (
                                            <DNA
                                            visible={true}
                                            height="50"
                                            width="50"
                                            ariaLabel="Downloadeding File"
                                            wrapperStyle={{}}
                                            wrapperClass="dna-wrapper"
                                            />
                                        )
                                        :(
                                            <FiDownload />
                                        )}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}

export default TableDataArtifact;







